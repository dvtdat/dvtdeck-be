import { Sport } from '@/entities/sport.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, Populate } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dtos/create-sport.dto';

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
    const [sports, total] = await this.sportRepository.findAndCount(query, {
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      orderBy: { id: 'asc' },
      populate: populateOption,
    });

    return {
      data: sports,
      total,
      pageSize,
      pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getSportById(id: number) {
    const sport = await this.sportRepository.findOne({ id });
    if (!sport) {
      throw new Error(`Sport with ID ${id} not found`);
    }

    return sport;
  }

  async deleteSportById(id: number) {
    const sport = await this.sportRepository.findOne({ id });
    if (!sport) {
      throw new Error(`Sport with ID ${id} not found`);
    }

    return await this.sportRepository.getEntityManager().removeAndFlush(sport);
  }
}
