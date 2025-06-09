import { Sport } from '@/entities/sport.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, Populate } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSportDto } from './dtos/create-sport.dto';
import { UpdateSportDto } from './dtos/update-sport.dto';

@Injectable()
export class SportService {
  private sportRepository: EntityRepository<Sport>;

  constructor(
    @InjectRepository(Sport) sportRepository: EntityRepository<Sport>,
  ) {
    this.sportRepository = sportRepository;
  }

  async createSport(createSportDto: CreateSportDto) {
    const sport = new Sport(
      createSportDto.name,
      createSportDto.description ?? '',
    );

    return await this.sportRepository
      .getEntityManager()
      .persistAndFlush([sport]);
  }

  async getSportPaginated(
    query: Record<string, any>,
    populateOption: Populate<Sport, any>,
    pageSize: number,
    pageNumber: number,
  ) {
    const [sports, total] = await this.sportRepository.findAndCount(
      { ...query, deletedAt: null },
      {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        orderBy: { id: 'asc' },
        populate: populateOption,
      },
    );

    return {
      data: sports,
      total,
      pageSize,
      pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getSportById(id: number) {
    const sport = await this.sportRepository.findOne({ id, deletedAt: null });
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }

    return sport;
  }

  async updateSportById(id: number, updateSportDto: UpdateSportDto) {
    const newDto = Object.fromEntries(
      Object.entries(updateSportDto).filter(([, value]) => value !== undefined),
    );

    if (Object.keys(newDto).length === 0) {
      throw new BadRequestException('No valid fields to update');
    }

    const result = await this.sportRepository.nativeUpdate(
      { id, deletedAt: null },
      newDto,
    );

    if (result === 0) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }

    return await this.sportRepository.findOne({ id, deletedAt: null });
  }

  async deleteSportById(id: number) {
    const sport = await this.sportRepository.findOne({ id, deletedAt: null });
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }

    sport.deletedAt = new Date();
    await this.sportRepository.getEntityManager().persistAndFlush(sport);
  }
}
