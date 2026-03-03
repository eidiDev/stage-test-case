import { IsString, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class UpdateDocumentDto extends BaseEntity {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly fileUrl: string;

    @IsOptional()
    @IsBoolean()
    readonly is_active: boolean;


}
