import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity()
export class Sport extends BaseEntity {
  @Property({ length: 50, nullable: false })
  name!: string;

  @Property({ length: 500, nullable: true })
  description?: string;

  constructor(name: string, description?: string) {
    super();
    this.name = name;
    this.description = description;
  }
}
