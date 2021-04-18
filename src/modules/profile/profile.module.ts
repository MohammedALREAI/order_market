import { Config } from './../../config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { AwsModule } from '../../shared/modules/aws/aws.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]),
    PassportModule.register({
    defaultStrategy:Config.Auth.strategies,
  }), AwsModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {
}
