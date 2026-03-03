import { IsString, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class UpdateAreaDto extends BaseEntity {

    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly is_active: boolean;
}
