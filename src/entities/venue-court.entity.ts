import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Venue } from './venue.entity';
import { Sport } from './sport.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class VenueCourt extends BaseEntity {
  @Property({ length: 50, nullable: false })
  name!: string;

  @ManyToOne(() => Venue, { nullable: false })
  venue!: Venue;

  @ManyToOne(() => Sport, { nullable: false })
  sport!: Sport;

  constructor(name: string, venue: Venue, sport: Sport) {
    super();
    this.name = name;
    this.venue = venue;
    this.sport = sport;
  }
}
