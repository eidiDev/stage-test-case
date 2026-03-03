import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { Crud, CrudController, CrudAuth, Override, ParsedRequest, CrudRequest, ParsedBody } from '@dataui/crud'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

import { ProcessService } from './process.service'
import { CreateProcessDto } from './dto/create-process.dto'
import { UpdateProcessDto } from './dto/update-process.dto'
import { Process } from './entities/process.entity'

@Crud({
  model: {
    type: Process,
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
      parent: { eager: false },
      children: { eager: false },
      area: { eager: true },
      tools: { eager: false },
      responsiblePeople: { eager: false },
      documents: { eager: false },
    },
  },
  dto: {
    create: CreateProcessDto,
    update: UpdateProcessDto,
  },
})
@Controller('process')
export class ProcessController implements CrudController<Process> {
  constructor(public service: ProcessService) { }

  @Override('createOneBase')
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: CreateProcessDto) {
    return this.service.createOne(req, dto);
  }

  @Get(':id/tree')
  async getTree(@Param('id') id: string) {
    return this.service.findTree(id);
  }
}