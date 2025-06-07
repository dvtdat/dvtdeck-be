import { Populate } from '@mikro-orm/core';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@/entities';
import { GetUsersPaginatedDto } from './dtos/get-users-paginated.dto';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';

@Controller('users')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Query() query: GetUserByIdDto) {
    const { id, populate } = query;
    const populateOption: Populate<User, any> = populate
      ? (['profile'] as const)
      : ([] as const);

    return await this.userService.getUserById(id, populateOption);
  }

  @Get()
  async getUsersPaginated(@Query() query: GetUsersPaginatedDto) {
    const { pageSize, pageNumber, populate } = query;

    const populateOption: Populate<User, any> = populate
      ? (['profile'] as const)
      : ([] as const);

    return this.userService.getUsersPaginated(
      {},
      populateOption,
      pageSize,
      pageNumber,
    );
  }
}
