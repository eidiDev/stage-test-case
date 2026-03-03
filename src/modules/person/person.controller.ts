import { Controller, UseGuards } from '@nestjs/common'
import { Crud, CrudController, CrudAuth } from '@dataui/crud'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

import { PersonService } from './person.service'
import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { Person } from './entities/person.entity'

@Crud({
  model: {
    type: Person,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      processes: { eager: false },
    },
  },
  dto: {
    create: CreatePersonDto,
    update: UpdatePersonDto,
  },
})
@Controller('people')
export class PersonController implements CrudController<Person> {
  constructor(public service: PersonService) { }
}