import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
