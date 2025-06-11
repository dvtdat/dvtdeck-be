import { Populate } from '@mikro-orm/core';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@/entities';
import { GetUsersPaginatedDto } from './dtos/get-users-paginated.dto';
import { GetUserByIdDto } from './dtos/get-user-by-id.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('list')
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

  @Get('details/:id')
  async getUser(@Query() query: GetUserByIdDto) {
    const { id, populate } = query;
    const populateOption: Populate<User, any> = populate
      ? (['profile'] as const)
      : ([] as const);

    return await this.userService.getUserById(id, populateOption);
  }

  @Patch('update/:id')
  async updateUserById(@Param('id') id: number) {}

  @Delete('delete/:id')
  async deleteUserById(@Param('id') id: number) {}
}
