import { Entity, OneToOne } from '@mikro-orm/core';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class UserProfile extends BaseEntity {
  @OneToOne(() => User, (user) => user.profile, { owner: true })
  user!: User;

  constructor(user: User) {
    super();
    this.user = user;
  }
}
