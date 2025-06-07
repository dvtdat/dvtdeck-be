import { Venue } from '@/entities/venue.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, Populate } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dtos/create-venue.dto';

@Injectable()
export class VenueService {
  private venueRepository: EntityRepository<Venue>;

  constructor(
    @InjectRepository(Venue) venueRepository: EntityRepository<Venue>,
  ) {
    this.venueRepository = venueRepository;
  }

  async createVenue(createVenueDto: CreateVenueDto) {
    const venue = new Venue(
      createVenueDto.name,
      createVenueDto.address,
      createVenueDto.contactInfo,
      createVenueDto.description ?? '',
      createVenueDto.isActive ?? true,
    );

    return await this.venueRepository
      .getEntityManager()
      .persistAndFlush([venue]);
  }

  async getSportPaginated(
    query: Record<string, any>,
    populateOption: Populate<Venue, any>,
    pageSize: number,
    pageNumber: number,
  ) {
    const [venues, total] = await this.venueRepository.findAndCount(
      { ...query, deletedAt: null },
      {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        orderBy: { id: 'asc' },
        populate: populateOption,
      },
    );

    return {
      data: venues,
      total,
      pageSize,
      pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  }
}
