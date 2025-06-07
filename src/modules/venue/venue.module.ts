import { Module } from '@nestjs/common';
import { VenueController } from './venue.controller';
import { VenueService } from './venue.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Venue } from '@/entities/venue.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Venue])],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
