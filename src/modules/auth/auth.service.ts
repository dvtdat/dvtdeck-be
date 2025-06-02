import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@/entities';
import { CreateUserDto } from '../user/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {}

  async login(user: User) {}

  async register(createUserDto: CreateUserDto) {}
}
