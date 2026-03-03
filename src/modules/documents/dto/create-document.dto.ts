import { IsString, IsObject, IsOptional, IsBoolean } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateDocumentDto extends BaseEntity {

    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly fileUrl: string;

    @IsBoolean()
    readonly is_active: boolean;

}
