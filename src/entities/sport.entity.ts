import { BaseEntity, Entity, Property } from '@mikro-orm/core';

@Entity()
export class Sport extends BaseEntity {
  @Property({ length: 50 })
  name: string;

  @Property({ length: 200 })
  address: string;

  @Property({ length: 50 })
  contactInfo: string;

  @Property({ length: 500 })
  description?: string;

  @Property()
  isActive: boolean;
}
