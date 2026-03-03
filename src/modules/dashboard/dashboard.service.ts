import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Process } from 'src/modules/process/entities/process.entity';
import { Area } from 'src/modules/areas/entities/area.entity';
import { Tool } from 'src/modules/tools/entities/tool.entity';
import { Person } from 'src/modules/person/entities/person.entity';
import { Document } from 'src/modules/documents/entities/document.entity';

type Status = 'ACTIVE' | 'IN_REVIEW' | 'CRITICAL';
type Type = 'MANUAL' | 'SYSTEM';
type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Process) private readonly processRepo: Repository<Process>,
    @InjectRepository(Area) private readonly areaRepo: Repository<Area>,
    @InjectRepository(Tool) private readonly toolRepo: Repository<Tool>,
    @InjectRepository(Person) private readonly personRepo: Repository<Person>,
    @InjectRepository(Document) private readonly docRepo: Repository<Document>,
  ) {}

  async overview() {
    // 🔧 Se você quiser contar somente processos RAIZ:
    // const processesCountPromise = this.processRepo.count({ where: { parent: null as any } });
    // Se quiser contar TODOS:
    const processesCountPromise = this.processRepo.count();

    const [processes, areas, tools, people, documents] = await Promise.all([
      processesCountPromise,
      this.areaRepo.count(),
      this.toolRepo.count(),
      this.personRepo.count(),
      this.docRepo.count(),
    ]);

    // ---- status counts ----
    const statusRows = await this.processRepo
      .createQueryBuilder('p')
      .select('p.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('p.status')
      .getRawMany<{ status: Status; count: string }>();

    const status: Record<Status, number> = {
      ACTIVE: 0,
      IN_REVIEW: 0,
      CRITICAL: 0,
    };

    for (const r of statusRows) {
      if (r?.status) status[r.status] = Number(r.count) || 0;
    }

    // ---- priority x type ----
    const ptRows = await this.processRepo
      .createQueryBuilder('p')
      .select('p.priority', 'priority')
      .addSelect('p.type', 'type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('p.priority')
      .addGroupBy('p.type')
      .getRawMany<{ priority: Priority; type: Type; count: string }>();

    const priorityByType: Record<Priority, Record<Type, number>> = {
      HIGH: { SYSTEM: 0, MANUAL: 0 },
      MEDIUM: { SYSTEM: 0, MANUAL: 0 },
      LOW: { SYSTEM: 0, MANUAL: 0 },
    };

    for (const r of ptRows) {
      if (!r?.priority || !r?.type) continue;
      if (!priorityByType[r.priority]) continue;
      priorityByType[r.priority][r.type] = Number(r.count) || 0;
    }

    return {
      metrics: {
        processes,
        areas,
        tools,
        people,
        documents,
        status,
      },
      priorityByType,
    };
  }
}