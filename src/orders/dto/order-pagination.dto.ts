import { PaginationDto } from 'src/common';
import { OrderStatus } from '../enum/order.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Status must be a valid enum value: ${Object.values(OrderStatus)}`,
  })
  status: OrderStatus;
}
