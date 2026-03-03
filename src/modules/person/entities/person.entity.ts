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

@Entity('people')
export class Person extends DefaultFieldsEntity {

    @Column()
    name: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true })
    email: string;

    @ManyToMany(() => Process, (process) => process.responsiblePeople)
    processes: Process[];
}
