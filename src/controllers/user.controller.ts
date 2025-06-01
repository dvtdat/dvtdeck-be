import { Populate } from '@mikro-orm/core';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos';
import { User } from 'src/entities';
import { UserService } from 'src/services';

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
  async getUser(
    @Param('id') id: number,
    @Query('populate') populate: string = 'false',
  ) {
    const shouldPopulate = populate.toLowerCase() === 'true';
    const populateOption: Populate<User, any> = shouldPopulate
      ? (['profile'] as const)
      : ([] as const);

    return this.userService.getUserById(id, populateOption);
  }

  @Get()
  async getUsersPaginated(
    @Query('pageSize') pageSize: string = '10',
    @Query('pageNumber') pageNumber: string = '1',
    @Query('populate') populate: string = 'false',
  ) {
    const shouldPopulate = populate.toLowerCase() === 'true';
    const populateOption: Populate<User, any> = shouldPopulate
      ? (['profile'] as const)
      : ([] as const);

    return this.userService.getUsersPaginated(
      {},
      populateOption,
      parseInt(pageSize, 10),
      parseInt(pageNumber, 10),
    );
  }
}
