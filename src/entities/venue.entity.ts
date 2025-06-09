import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { VenueCourt } from './venue-court.entity';

@Entity()
export class Venue extends BaseEntity {
  @Property({ length: 50, nullable: false })
  name!: string;

  @Property({ length: 100, nullable: false })
  address!: string;

  @Property({ length: 50, nullable: false })
  contactInfo!: string;

  @Property({ length: 255, nullable: true })
  description?: string;

  @Property({ type: 'boolean', default: true })
  isActive!: boolean;

  @OneToMany(() => VenueCourt, (court) => court.venue)
  courts = new Collection<VenueCourt>(this);

  constructor(
    name: string,
    address: string,
    contactInfo: string,
    description?: string,
    isActive?: boolean,
  ) {
    super();
    this.name = name;
    this.address = address;
    this.contactInfo = contactInfo;
    this.description = description;
    this.isActive = isActive ?? true;
  }
}
