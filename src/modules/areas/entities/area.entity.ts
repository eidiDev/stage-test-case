import {
    Column,
    Entity,
    JoinColumn,
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

@Entity('areas')
export class Area extends  DefaultFieldsEntity{

    @Column({ nullable: true, default: '' })
    name: string;

    @Column({ nullable: true, default: '' })
    description: string;

    // process
    @OneToMany(() => Process, (process) => process.area)
    processes: Process[];
}
