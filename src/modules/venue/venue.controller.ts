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

  @Get(':id')
  async getVenueById(@Param('id') id: number) {
    return await this.venueService.getVenueById(id);
  }

  @Patch(':id')
  async updateVenueById(@Param('id') id: number, @Body() body: UpdateVenueDto) {
    const venue = await this.venueService.getVenueById(id);

    const updateVenueDto: UpdateVenueDto = {
      name: body.name ?? venue.name,
      address: body.address ?? venue.address,
      contactInfo: body.contactInfo ?? venue.contactInfo,
      description: body.description ?? venue.description,
      isActive: body.isActive ?? venue.isActive,
    };

    return await this.venueService.updateVenueById(id, updateVenueDto);
  }

  @Delete(':id')
  async deleteVenueById(@Param('id') id: number) {
    return this.venueService.deleteVenueById(id);
  }
}
