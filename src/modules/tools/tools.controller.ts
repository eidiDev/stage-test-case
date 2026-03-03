import { Controller, UseGuards } from '@nestjs/common'
import { Crud, CrudController, CrudAuth } from '@dataui/crud'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

import { ToolsService } from './tools.service'
import { CreateToolDto } from './dto/create-tool.dto'
import { UpdateToolDto } from './dto/update-tool.dto'
import { Tool } from './entities/tool.entity'

@Crud({
  model: {
    type: Tool,
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
    create: CreateToolDto,
    update: UpdateToolDto,
  },
})
@Controller('tools')
export class ToolsController implements CrudController<Tool> {
  constructor(public service: ToolsService) { }
}