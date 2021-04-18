import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailVerification } from './entities/email-verification.entity';
import { JwtStrategy } from './stratigies/jwt-strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ForgottenPassword } from './entities/forgotten-password.entity';
import { ProfileModule } from '../profile/profile.module';
import { EmailModule } from '../../shared/modules/email/email.module';
import { Config } from './../../config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: Config.Auth.strategies,
    }),
    JwtModule.register({
      secret: Config.Auth.secretKey,
      signOptions: {
        expiresIn: Config.Auth.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, EmailVerification, ForgottenPassword]),
    ProfileModule,
    EmailModule,
    HttpModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule {
}
