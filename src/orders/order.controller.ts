import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';

import { ORDER_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('create_order', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send('find_all_orders', orderPaginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('find_one_order', id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
  @Get(':status')
  findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.ordersClient.send('find_all_orders', {
      ...paginationDto,
      status: statusDto.status,
    });
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.ordersClient
      .send('update_order_status', {
        id,
        status: statusDto.status,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
