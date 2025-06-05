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
import { SportService } from './sport.service';
import { CreateSportDto } from './dtos/create-sport.dto';
import { GetSportsPaginatedDto } from './dtos/get-sports-paginated.dto';

@Controller('sport')
export class SportController {
  private readonly sportService: SportService;

  constructor(sportService: SportService) {
    this.sportService = sportService;
  }

  @Post()
  async createSport(@Body() createSportDto: CreateSportDto) {
    return await this.sportService.createSport(createSportDto);
  }

  @Get(':id')
  async getSportById(@Param('id') id: number) {
    return await this.sportService.getSportById(id);
  }

  @Get()
  async getSportsPaginated(@Query() query: GetSportsPaginatedDto) {
    const { pageSize, pageNumber } = query;
    return this.sportService.getSportPaginated({}, false, pageSize, pageNumber);
  }

  @Patch(':id')
  async updateSportById() {}

  @Delete(':id')
  async deleteSportById() {}
}
