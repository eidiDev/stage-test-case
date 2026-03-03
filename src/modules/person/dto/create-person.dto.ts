import { IsString, IsObject, IsOptional, IsEmail, IsBoolean } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreatePersonDto extends BaseEntity {

    @IsString()
    readonly name: string;

    @IsString()
    readonly role: string;

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsBoolean()
    readonly is_active: boolean;
}
