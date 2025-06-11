import { GetByIdBaseDto } from '@/common/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetVenueByIdDto extends GetByIdBaseDto {
  @ApiProperty({
    description: 'Indicates whether to populate the venue courts.',
    type: Boolean,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  populate: boolean = false;
}
