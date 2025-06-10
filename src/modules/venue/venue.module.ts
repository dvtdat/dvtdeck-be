import { Module } from '@nestjs/common';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Venue } from '@/entities/venue.entity';
import { VenueCourt } from '@/entities/venue-court.entity';
import { SportModule } from '../sport/sport.module';

@Module({
  imports: [MikroOrmModule.forFeature([Venue, VenueCourt]), SportModule],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
