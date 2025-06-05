import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class GetPaginatedBaseDto {
  @ApiProperty({
    example: 10,
    minimum: 1,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string, 10))
  @IsPositive()
  @Min(1)
  pageSize: number = 1;

  @ApiProperty({
    example: 1,
    minimum: 1,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string, 10))
  @IsPositive()
  @Min(1)
  pageNumber: number = 1;
}
