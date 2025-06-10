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
import { GetVenueCourtsPaginatedDto } from './dtos/get-venue-courts-paginated.dto';

@Controller('venue')
export class VenueController {
  constructor(
    private readonly venueService: VenueService,
    private readonly sportService: SportService,
  ) {}
  @Post('create')
  async createVenue(@Body() createVenueDto: CreateVenueDto) {
    return await this.venueService.createVenue(createVenueDto);
  }

  @Get('list')
  async getVenuesPaginated(@Query() query: GetVenuesPaginatedDto) {
    const { pageSize, pageNumber } = query;
    return this.venueService.getSportPaginated({}, false, pageSize, pageNumber);
  }

  @Get('details/:venueId')
  async getVenueById(@Param('venueId') venueId: number) {
    return await this.venueService.getVenueById(venueId);
  }

  @Patch('update/:venueId')
  async updateVenueById(
    @Param('venueId') venueId: number,
    @Body() body: UpdateVenueDto,
  ) {
    return await this.venueService.updateVenueById(venueId, body);
  }

  @Delete('delete/:venueId')
  async deleteVenueById(@Param('venueId') venueId: number) {
    return this.venueService.deleteVenueById(venueId);
  }

  @Post('court/create')
  async createVenueCourt(@Body() createVenueCourtDto: CreateVenueCourtDto) {
    const { name, venueId, sportId } = createVenueCourtDto;

    const venue = await this.venueService.getVenueById(venueId);
    const sport = await this.sportService.getSportById(sportId);

    return this.venueService.createVenueCourt(name, venue, sport);
  }

  @Get('court/list')
  getVenueCourtsPaginated(@Query() query: GetVenueCourtsPaginatedDto) {
    const { pageSize, pageNumber, venueIds } = query;
    console.log('this', venueIds);
    return this.venueService.getVenueCourtsPaginated(
      {},
      false,
      pageSize,
      pageNumber,
      venueIds,
    );
  }

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
