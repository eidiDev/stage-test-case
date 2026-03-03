import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { IsArray, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { UniqueOnDatabase } from '../../../common/validations/uniqueValidation';

import { Type } from 'class-transformer';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: number;

  // @PrimaryGeneratedColumn('uuid')
  // @Column()
  // @Generated('uuid')
  // uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: true })
  is_active: boolean;


  @Column({ unique: true })
  //@IsEmail()
  @UniqueOnDatabase(User)
  email: string;

  @Column()
  password: string;


  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 8);
  }


  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  
}
