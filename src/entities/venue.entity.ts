import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

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
