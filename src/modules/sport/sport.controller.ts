import { Controller } from '@nestjs/common';
import { SportService } from './sport.service';

@Controller('sport')
export class SportController {
  private readonly sportService: SportService;

  constructor(sportService: SportService) {
    this.sportService = sportService;
  }
}
