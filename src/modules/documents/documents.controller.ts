import { Controller, UseGuards } from '@nestjs/common'
import { Crud, CrudController, CrudAuth } from '@dataui/crud'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'

import { DocumentsService } from './documents.service'
import { CreateDocumentDto } from './dto/create-document.dto'
import { UpdateDocumentDto } from './dto/update-document.dto'
import { Document } from './entities/document.entity'

@Crud({
  model: {
    type: Document,
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
    create: CreateDocumentDto,
    update: UpdateDocumentDto,
  },
})
@Controller('documents')
export class DocumentsController implements CrudController<Document> {
  constructor(public service: DocumentsService) { }
}