import { Sport } from '@/entities/sport.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SportService } from './sport.service';
import { SportController } from './sport.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Sport])],
  providers: [SportService],
  controllers: [SportController],
  exports: [SportService],
})
export class SportModule {}
