import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';
import { Subscriber } from './entities/subscriber.entity';
import { SubscribersNotifications } from './entities/subscribers-notifications.entity';
import { PassportModule } from '@nestjs/passport';
import { Config } from './../../config';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EmailModule } from '../../shared/modules/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity, Subscriber, SubscribersNotifications]),
    PassportModule.register({
            defaultStrategy: Config.Auth.strategies,
      
    }), EmailModule,
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {
}
