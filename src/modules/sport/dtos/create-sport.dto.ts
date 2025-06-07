import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSportDto {
  @ApiProperty({ description: 'The name of the sport' })
  name: string;

  @ApiPropertyOptional({ description: 'A brief description of the sport' })
  description?: string;
}
