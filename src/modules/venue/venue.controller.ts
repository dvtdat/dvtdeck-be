import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { GetVenuesPaginatedDto } from './dtos/get-venues-paginated.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';
import { CreateVenueCourtDto } from './dtos/create-venue-court.dto';
import { SportService } from '../sport/sport.service';

@Controller('venue')
export class VenueController {
  constructor(
    private readonly venueService: VenueService,
    private readonly sportService: SportService,
  ) {}

  @Post()
  async createVenue(@Body() createVenueDto: CreateVenueDto) {
    return await this.venueService.createVenue(createVenueDto);
  }

  @Get()
  async getVenuesPaginated(@Query() query: GetVenuesPaginatedDto) {
    const { pageSize, pageNumber } = query;
    return this.venueService.getSportPaginated({}, false, pageSize, pageNumber);
  }

  @Get(':id')
  async getVenueById(@Param('id') id: number) {
    return await this.venueService.getVenueById(id);
  }

  @Patch(':id')
  async updateVenueById(@Param('id') id: number, @Body() body: UpdateVenueDto) {
    return await this.venueService.updateVenueById(id, body);
  }

  @Delete(':id')
  async deleteVenueById(@Param('id') id: number) {
    return this.venueService.deleteVenueById(id);
  }

  @Post('court')
  async createVenueCourt(@Body() createVenueCourtDto: CreateVenueCourtDto) {
    const { name, venueId, sportId } = createVenueCourtDto;

    const venue = await this.venueService.getVenueById(venueId);
    const sport = await this.sportService.getSportById(sportId);

    return this.venueService.createVenueCourt(name, venue, sport);
  }

  @Get('court')
  async getVenueCourtsPaginated() {}

  @Get('court/:venueId')
  async getVenueCourtsByVenueId() {}

  @Get('court/:id')
  async getVenueCourtById() {}

  @Patch('court/:id')
  async updateVenueCourtById() {
    // handle update name (easy)
    // handle change sport (easy)
    // handle changing court (harder)
  }

  @Delete('court/:id')
  async deleteCourtById() {
    // remove from venue_court and venue
  }
}
