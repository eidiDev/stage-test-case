import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
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
import { Process } from 'src/modules/process/entities/process.entity';

@Entity('documents')
export class Document extends DefaultFieldsEntity {

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    fileUrl: string;

    @ManyToMany(() => Process, (process) => process.documents)
    processes: Process[];
}
