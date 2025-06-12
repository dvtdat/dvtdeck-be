import { Venue } from '@/entities/venue.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  EntityRepository,
  Populate,
  Transactional,
} from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVenueDto } from './dtos/create-venue.dto';
import { UpdateVenueDto } from './dtos/update-venue.dto';
import { Sport } from '@/entities/sport.entity';
import { VenueCourt } from '@/entities/venue-court.entity';

@Injectable()
export class VenueService {
  private venueRepository: EntityRepository<Venue>;
  private venueCourtRepository: EntityRepository<VenueCourt>;

  constructor(
    @InjectRepository(Venue) venueRepository: EntityRepository<Venue>,
    @InjectRepository(VenueCourt)
    venueCourtRepository: EntityRepository<VenueCourt>,
  ) {
    this.venueRepository = venueRepository;
    this.venueCourtRepository = venueCourtRepository;
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

  async getVenuePaginated(
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

  async getVenueById(id: number, populateOption: Populate<Venue, any>) {
    const venue = await this.venueRepository.findOne(
      { id, deletedAt: null },
      { populate: populateOption },
    );
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

  @Transactional()
  async deleteVenueById(id: number) {
    const venue = await this.venueRepository.findOne({ id, deletedAt: null });
    if (!venue) {
      throw new NotFoundException(`Venue with ID ${id} not found`);
    }

    const now = new Date();

    await this.venueCourtRepository.nativeUpdate(
      { venue: id, deletedAt: null },
      { deletedAt: now },
    );

    venue.deletedAt = now;
    await this.venueRepository.getEntityManager().persistAndFlush(venue);
  }

  @Transactional()
  async createVenueCourt(name: string, venue: Venue, sport: Sport) {
    const venueCourt = new VenueCourt(name, venue, sport);
    venue.courts.add(venueCourt);

    await this.venueRepository.getEntityManager().persistAndFlush(venue);

    return this.venueCourtRepository
      .getEntityManager()
      .persistAndFlush(venueCourt);
  }

  async getVenueCourtsPaginated(
    query: Record<string, any>,
    populateOption: Populate<Venue, any>,
    pageSize: number,
    pageNumber: number,
    venueIds: number[],
  ) {
    const [courts, total] = await this.venueCourtRepository.findAndCount(
      {
        ...query,
        ...(venueIds?.length ? { venue: { id: { $in: venueIds } } } : {}),
        deletedAt: null,
      },
      {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        orderBy: { id: 'asc' },
        populate: populateOption,
      },
    );

    return {
      data: courts,
      total,
      pageSize,
      pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async updateVenueCourtById(
    id: number,
    name: string | undefined,
    venue: Venue | undefined,
    sport: Sport | undefined,
  ) {
    const existingCourt = await this.venueCourtRepository.findOne(
      { id, deletedAt: null },
      { populate: ['venue', 'sport'] },
    );

    if (!existingCourt) {
      throw new NotFoundException(`Venue court with ID ${id} not found`);
    }

    if (name !== undefined) {
      existingCourt.name = name;
    }

    if (venue !== undefined) {
      existingCourt.venue = venue;
    }

    if (sport !== undefined) {
      existingCourt.sport = sport;
    }

    return await this.venueCourtRepository
      .getEntityManager()
      .persistAndFlush(existingCourt);
  }

  async deleteVenueCourtById(id: number) {
    const venueCourt = await this.venueCourtRepository.findOne({
      id,
      deletedAt: null,
    });

    if (!venueCourt) {
      throw new NotFoundException(`Venue court with ID ${id} not found`);
    }

    venueCourt.deletedAt = new Date();
    await this.venueCourtRepository
      .getEntityManager()
      .persistAndFlush(venueCourt);

    return venueCourt;
  }
}
