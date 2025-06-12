import { ApiProperty } from '@nestjs/swagger';

export class UpdateVenueCourtDto {
  @ApiProperty({ description: 'The name of the court' })
  name?: string;

  @ApiProperty({ description: 'The ID of the venue' })
  venueId?: number;

  @ApiProperty({ description: 'The ID of the sport' })
  sportId?: number;
}
