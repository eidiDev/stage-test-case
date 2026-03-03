import {
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RelationIdDto } from './relation-id.dto';

export class CreateProcessChildDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // 👇 AREA AGORA OPCIONAL
  @IsOptional()
  @ValidateNested()
  @Type(() => RelationIdDto)
  area?: RelationIdDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RelationIdDto)
  parent?: RelationIdDto;

  @IsEnum(['MANUAL', 'SYSTEM'])
  type: 'MANUAL' | 'SYSTEM';

  @IsEnum(['ACTIVE', 'IN_REVIEW', 'CRITICAL'])
  status: 'ACTIVE' | 'IN_REVIEW' | 'CRITICAL';

  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
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
  people?: RelationIdDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RelationIdDto)
  documents?: RelationIdDto[];

  // 👇 Recursividade usando o próprio child
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProcessChildDto)
  children?: CreateProcessChildDto[];
}