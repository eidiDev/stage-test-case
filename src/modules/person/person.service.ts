import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService extends TypeOrmCrudService<Person>{
  constructor(@InjectRepository(Person) repo: Repository<Person>) {
    super(repo);
  }
}
