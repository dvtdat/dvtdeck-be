import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Request } from 'express';
import googleOauthConfig from '@/config/google-oauth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfig: ConfigType<typeof googleOauthConfig>,
  ) {
    if (
      !googleConfig.clientId ||
      !googleConfig.clientSecret ||
      !googleConfig.callbackURL
    ) {
      throw new Error('Google OAuth configuration is incomplete.');
    }

    super({
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('OAuth Profile:', profile);
    done(null, profile);
  }
}
