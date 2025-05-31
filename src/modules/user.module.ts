import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user.controller';
import { UserProfile } from 'src/entities';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserProfile])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
