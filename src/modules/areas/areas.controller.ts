import { Controller, UseGuards } from '@nestjs/common'
import { Crud, CrudController, CrudAuth } from '@dataui/crud'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

import { AreasService } from './areas.service'
import { CreateAreaDto } from './dto/create-area.dto'
import { UpdateAreaDto } from './dto/update-area.dto'
import { Area } from './entities/area.entity'

@Crud({
  model: {
    type: Area,
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
    create: CreateAreaDto,
    update: UpdateAreaDto,
  },
})
@Controller('areas')
export class AreasController implements CrudController<Area> {
  constructor(public service: AreasService) { }
}