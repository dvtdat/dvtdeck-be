import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SportModule } from './modules/sport/sport.module';
import { VenueModule } from './modules/venue/venue.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    UserModule,
    AuthModule,
    SportModule,
    VenueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
