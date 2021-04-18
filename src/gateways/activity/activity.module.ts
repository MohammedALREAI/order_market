import { Config } from './../../config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ActivityController } from './activity.controller';
import { ActivityGateway } from './activity.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityRepository } from './activity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityRepository]),
    PassportModule.register({
      defaultStrategy: Config.Auth.strategies,
    }),
  ],
  controllers: [ActivityController],
  providers: [ActivityGateway],
})
export class ActivityModule {

}
