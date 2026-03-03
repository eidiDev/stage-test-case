import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Tool } from './entities/tool.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ToolsService extends TypeOrmCrudService<Tool>{
  constructor(@InjectRepository(Tool) repo: Repository<Tool>) {
    super(repo);
  }
}
