import { ApiProperty } from '@nestjs/swagger';

export class UpdateVenueDto {
  @ApiProperty({ description: 'The name of the venue' })
  name?: string;

  @ApiProperty({ description: 'The address of the venue' })
  address?: string;

  @ApiProperty({ description: 'The contact information of the venue' })
  contactInfo?: string;

  @ApiProperty({ description: 'A brief description of the venue' })
  description?: string;

  @ApiProperty({ description: 'Indicates whether the venue is active' })
  isActive?: boolean;
}
