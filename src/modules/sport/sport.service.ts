import { Sport } from '@/entities/sport.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SportService {
  private sportRepository: EntityRepository<Sport>;

  constructor(
    @InjectRepository(Sport) sportRepository: EntityRepository<Sport>,
  ) {
    this.sportRepository = sportRepository;
  }
}
