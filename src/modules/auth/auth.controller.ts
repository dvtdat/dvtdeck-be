import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    // Debug: log the returned user object
    console.log('Google user:', user);

    // For now, just return user JSON directly
    // In real apps, you might create a JWT or session and redirect
    return res.json(user);
  }
}
