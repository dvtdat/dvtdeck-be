import { GetPaginatedBaseDto } from '@/common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsArray, IsBoolean } from 'class-validator';

export class GetVenueCourtsPaginatedDto extends GetPaginatedBaseDto {
  @ApiProperty({
    description: 'The IDs of the venues',
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    return [value as number];
  })
  venueIds: number[];

  @ApiProperty({
    description: 'Indicates whether to populate the sport information.',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  populateSport: boolean = false;
}
