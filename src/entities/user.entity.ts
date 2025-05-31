import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { UserProfile } from './user-profile.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  username: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, { nullable: true })
  profile?: UserProfile;

  constructor(
    email: string,
    password: string,
    username: string,
    profile?: UserProfile,
  ) {
    super();
    this.email = email;
    this.password = password;
    this.username = username;
    this.profile = profile;
  }
}
