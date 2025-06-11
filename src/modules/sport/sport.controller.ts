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
import { UpdateSportDto } from './dtos/update-sport.dto';

@Controller('sport')
export class SportController {
  private readonly sportService: SportService;

  constructor(sportService: SportService) {
    this.sportService = sportService;
  }

  @Post('create')
  async createSport(@Body() createSportDto: CreateSportDto) {
    return await this.sportService.createSport(createSportDto);
  }

  @Get('details/:id')
  async getSportById(@Param('id') id: number) {
    return await this.sportService.getSportById(id);
  }

  @Get('list')
  async getSportsPaginated(@Query() query: GetSportsPaginatedDto) {
    const { pageSize, pageNumber } = query;
    return this.sportService.getSportPaginated({}, false, pageSize, pageNumber);
  }

  @Patch('update/:id')
  async updateSportById(@Param('id') id: number, @Body() body: UpdateSportDto) {
    return this.sportService.updateSportById(id, body);
  }

  @Delete('delete/:id')
  async deleteSportById(@Param('id') id: number) {
    return this.sportService.deleteSportById(id);
  }
}
