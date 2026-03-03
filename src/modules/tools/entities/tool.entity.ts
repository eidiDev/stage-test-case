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
import { User } from '../../users/entities/user.entity';
import { Process } from 'src/modules/process/entities/process.entity';

@Entity('tools')
export class Tool extends DefaultFieldsEntity {

    @Column({ nullable: true, default: '' })
    title: string;

    @Column({ nullable: true, default: '' })
    description: string;

    @ManyToMany(() => Process, (process) => process.tools)
    processes: Process[];

}
