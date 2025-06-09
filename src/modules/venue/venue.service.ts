import { Venue } from '@/entities/venue.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, Populate } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';

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

  async getVenueById(id: number) {
    const venue = await this.venueRepository.findOne({ id, deletedAt: null });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }

    return venue;
  }

  async updateVenueById(id: number, updateVenueDto: UpdateVenueDto) {
    const newDto = Object.fromEntries(
      Object.entries(updateVenueDto).filter(([, value]) => value !== undefined),
    );

    if (Object.keys(newDto).length === 0) {
      throw new BadRequestException('No valid fields to update');
    }

    const result = await this.venueRepository.nativeUpdate(
      { id, deletedAt: null },
      newDto,
    );

    if (result === 0) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }

    return await this.venueRepository.findOne({ id, deletedAt: null });
  }

  async deleteVenueById(id: number) {
    const venue = await this.venueRepository.findOne({ id, deletedAt: null });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }

    venue.deletedAt = new Date();
    await this.venueRepository.getEntityManager().persistAndFlush(venue);
  }
}
