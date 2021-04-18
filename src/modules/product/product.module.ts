import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Config } from './../../config';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from './entities/product-tag.entity';
import { ProductRepository } from './repositories/product.repository';
import { TagModule } from '../tag/tag.module';
import { CartModule } from '../cart/cart.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, ProductTag]),
    PassportModule.register({
      defaultStrategy: Config.Auth.strategies,
    }), AwsModule, forwardRef(() => TagModule), forwardRef(() => CartModule)],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {

}
