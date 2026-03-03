import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Document } from './entities/document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentsService extends TypeOrmCrudService<Document>{
  constructor(@InjectRepository(Document) repo: Repository<Document>) {
    super(repo);
  }
}
