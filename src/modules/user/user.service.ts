import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, Populate } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { User, UserProfile } from '@/entities';

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

  private async verifyPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new User(
      createUserDto.email,
      hashedPassword,
      createUserDto.username,
    );

    const userProfile = new UserProfile(user);

    user.profile = userProfile;

    return await this.userRepository
      .getEntityManager()
      .persistAndFlush([user, userProfile]);
  }

  async getUsersPaginated(
    query: Record<string, any>,
    populateOption: Populate<User, any>,
    pageSize: number,
    pageNumber: number,
  ) {
    const [users, total] = await this.userRepository.findAndCount(query, {
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      orderBy: { id: 'asc' },
      populate: populateOption,
    });

    return {
      data: users,
      total,
      pageSize,
      pageNumber,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async getUserById(id: number, populateOption: Populate<User, any>) {
    return await this.userRepository.findOne(
      { id },
      { populate: populateOption },
    );
  }
}
