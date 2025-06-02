import { Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post()
  async login() {}

  @Post()
  async register() {}

  @Post()
  async refresh() {}

  @Post()
  async logout() {}
}
