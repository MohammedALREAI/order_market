import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Config } from './../../config';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './invoice.entity';
import { OrderModule } from '../order/order.module';


@Module({
  imports: [TypeOrmModule.forFeature([Invoice]),
    PassportModule.register({
      defaultStrategy: Config.Auth.strategies,
    }), forwardRef(() => OrderModule)],
  providers: [InvoiceService],
  controllers: [InvoiceController],
  exports: [InvoiceService],
})
export class InvoiceModule {

}
