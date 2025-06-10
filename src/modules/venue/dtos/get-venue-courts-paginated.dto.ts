import { GetPaginatedBaseDto } from '@/common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class GetVenueCourtsPaginatedDto extends GetPaginatedBaseDto {
  @ApiProperty({ description: 'The IDs of the venues', type: [Number] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    return [];
  })
  venueIds: number[];
  // TODO: fix non-array issues
}
