import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class GetByIdBaseDto {
  @ApiProperty({})
  @Transform(({ value }) => parseInt(value as string, 10))
  @IsPositive()
  id: number;
}
