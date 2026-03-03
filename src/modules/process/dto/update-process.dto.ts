import {
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RelationIdDto } from './relation-id.dto';
import { BaseEntity } from 'typeorm';

export enum ProcessStatus {
  ACTIVE = 'ACTIVE',
  IN_REVIEW = 'IN_REVIEW',
  CRITICAL = 'CRITICAL'
}

export enum ProcessType {
  MANUAL = 'MANUAL',
  SYSTEM = 'SYSTEM'
}

export enum ProcessPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export class UpdateProcessDto extends BaseEntity {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // PERMITE MOVER NA ÁRVORE
  @IsOptional()
  @ValidateNested()
  @Type(() => RelationIdDto)
  parent?: RelationIdDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RelationIdDto)
  area?: RelationIdDto;

  @IsOptional()
  @IsEnum(ProcessType)
  type?: 'MANUAL' | 'SYSTEM';

  @IsOptional()
  @IsEnum(ProcessStatus)
  status?: 'ACTIVE' | 'IN_REVIEW' | 'CRITICAL';

  @IsOptional()
  @IsEnum(ProcessPriority)
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationIdDto)
  tools?: RelationIdDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationIdDto)
  responsiblePeople?: RelationIdDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationIdDto)
  documents?: RelationIdDto[];

  // NÃO EXISTE children aqui
}