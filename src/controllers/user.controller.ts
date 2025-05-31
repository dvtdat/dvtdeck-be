import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/services';

@Controller('users')
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserWithProfile(id);
  }

  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }
}
