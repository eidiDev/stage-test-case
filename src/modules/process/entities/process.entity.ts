import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';
import {
    IsDefined,
    IsEnum,
    IsObject,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

import { DefaultFieldsEntity } from '../../entities/defaultFieldsEntity';
import { Area } from 'src/modules/areas/entities/area.entity';
import { Tool } from 'src/modules/tools/entities/tool.entity';
import { Person } from 'src/modules/person/entities/person.entity';
import { Document } from 'src/modules/documents/entities/document.entity';


// import { User } from '../../users/entities/user.entity';

@Tree('closure-table')
@Entity('processes')
export class Process extends DefaultFieldsEntity {

    @Column({ nullable: true, default: '' })
    name: string;

    @Column({ nullable: true, default: '' })
    description: string;

    @TreeParent({
        onDelete: 'CASCADE'
    })
    parent: Process;

    @TreeChildren({ cascade: true })
    children: Process[];

    @ManyToOne(() => Area, (area) => area.processes, {
        onDelete: 'CASCADE',
    })
    area: Area;

    @Column({
        type: 'enum',
        enum: ['MANUAL', 'SYSTEM'],
        default: 'MANUAL',
    })
    type: 'MANUAL' | 'SYSTEM';

    @Column({
        type: 'enum',
        enum: ['ACTIVE', 'IN_REVIEW', 'CRITICAL'],
        default: 'ACTIVE',
    })
    status: 'ACTIVE' | 'IN_REVIEW' | 'CRITICAL';

    @Column({
        type: 'enum',
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        default: 'MEDIUM',
    })
    priority: 'LOW' | 'MEDIUM' | 'HIGH';

    @ManyToMany(() => Tool, { cascade: true })
    @JoinTable()
    tools: Tool[];

    @ManyToMany(() => Person, { cascade: true })
    @JoinTable()
    responsiblePeople: Person[];

    @ManyToMany(() => Document, { cascade: true })
    @JoinTable()
    documents: Document[];
}
