import {
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RelationIdDto } from './relation-id.dto';
import { BaseEntity } from 'typeorm';
import { CreateProcessChildDto } from './create-process-child.dto';

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

export class CreateProcessDto extends BaseEntity {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // PERMITE DEFINIR PAI
  @IsOptional()
  @ValidateNested()
  @Type(() => RelationIdDto)
  parent?: RelationIdDto;

  // AREA
  @IsDefined()
  @ValidateNested()
  @Type(() => RelationIdDto)
  area: RelationIdDto;

  @IsEnum(ProcessType)
  type: 'MANUAL' | 'SYSTEM';

  @IsEnum(ProcessStatus)
  status: 'ACTIVE' | 'IN_REVIEW' | 'CRITICAL';

  @IsEnum(ProcessPriority)
  priority: 'LOW' | 'MEDIUM' | 'HIGH';

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

  // PERMITIDO APENAS NO CREATE
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProcessChildDto)
  children?: CreateProcessChildDto[];
}