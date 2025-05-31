import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos';
import { User, UserProfile } from 'src/entities';

@Injectable()
export class UserService {
  private userRepository: EntityRepository<User>;
  private userProfileRepository: EntityRepository<UserProfile>;

  constructor(
    @InjectRepository(User) userRepository: EntityRepository<User>,
    @InjectRepository(UserProfile)
    userProfileRepository: EntityRepository<UserProfile>,
  ) {
    this.userRepository = userRepository;
    this.userProfileRepository = userProfileRepository;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = new User(
      createUserDto.email,
      createUserDto.password,
      createUserDto.username,
    );

    const userProfile = new UserProfile(user);

    user.profile = userProfile;

    await this.userRepository
      .getEntityManager()
      .persistAndFlush([user, userProfile]);
  }

  async getAllUser() {
    return this.userRepository.findAll();
  }

  async getUser(id: number) {
    return this.userRepository.findOne({ id });
  }

  async getUserWithProfile(id: number) {
    return this.userRepository.findOne({ id }, { populate: ['profile'] });
  }
}
