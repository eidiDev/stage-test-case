import { IsString, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { BaseEntity } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export class UpdateToolDto extends BaseEntity {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly is_active: boolean;

}
