import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { GetVenuesPaginatedDto } from './dtos/get-venues-paginated.dto';

@Controller('venue')
export class VenueController {
  private readonly venueService: VenueService;

  constructor(venueService: VenueService) {
    this.venueService = venueService;
  }

  @Post()
  async createVenue(@Body() createVenueDto: CreateVenueDto) {
    return await this.venueService.createVenue(createVenueDto);
  }

  @Get()
  async getVenuesPaginated(@Query() query: GetVenuesPaginatedDto) {
    const { pageSize, pageNumber } = query;
    return this.venueService.getSportPaginated({}, false, pageSize, pageNumber);
  }
}
