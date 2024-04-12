import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE, envs } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroserviceHost,
          port: envs.ordersMicroservicePort,
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [],
})
export class OrderModule {}
