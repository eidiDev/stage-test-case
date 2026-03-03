import { IsString, IsObject, IsOptional, IsEmail, IsBoolean } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class UpdatePersonDto extends BaseEntity {
    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly role: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    readonly email: string;


    @IsOptional()
    @IsBoolean()
    readonly is_active: boolean;
}
