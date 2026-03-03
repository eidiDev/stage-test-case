import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Process } from './entities/process.entity';
import { DeepPartial, Repository, TreeRepository } from 'typeorm';
import { CrudRequest } from '@dataui/crud';
import { CreateProcessDto } from './dto/create-process.dto';

type ProcessTreeNode = {
  area?: any;
  children?: ProcessTreeNode[];
};

@Injectable()
export class ProcessService extends TypeOrmCrudService<Process> {
  constructor(@InjectRepository(Process) repo: Repository<Process>) {
    super(repo);
  }

  async createOne(
    req: CrudRequest,
    dto: DeepPartial<Process>,
  ): Promise<Process> {

    // Cast interno para usar como DTO
    const createDto = dto as CreateProcessDto;

    this.inheritArea(createDto);

    return super.createOne(req, dto);
  }

  private inheritArea(node: ProcessTreeNode, parentArea?: any) {
    const currentArea = node.area ?? parentArea;

    if (!currentArea) return;

    node.area = currentArea;

    if (!node.children?.length) return;

    for (const child of node.children) {
      this.inheritArea(child, currentArea);
    }
  }

  async findTree(id: any): Promise<Process> {
    const treeRepository: TreeRepository<Process> =
      this.repo.manager.getTreeRepository(Process);

    const root = await treeRepository.findOne({
      where: { id },
      relations: ['area', 'tools', 'responsiblePeople', 'documents'],
    });

    if (!root) {
      throw new NotFoundException('Process not found');
    }

    return treeRepository.findDescendantsTree(root, {
      relations: ['area', 'tools', 'responsiblePeople', 'documents'],
    });
  }
}
