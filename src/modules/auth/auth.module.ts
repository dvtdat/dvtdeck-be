import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import googleOauthConfig from '@/config/google-oauth.config';
import { GoogleStrategy } from '@/strategies/google.strategy';

@Module({
  imports: [UserModule, ConfigModule.forFeature(googleOauthConfig)],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
