import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { Process } from 'src/modules/process/entities/process.entity';
import { Area } from 'src/modules/areas/entities/area.entity';
import { Tool } from 'src/modules/tools/entities/tool.entity';
import { Person } from 'src/modules/person/entities/person.entity';
import { Document } from 'src/modules/documents/entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Process, Area, Tool, Person, Document])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}