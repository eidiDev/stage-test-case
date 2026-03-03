import { IsString, IsObject, IsOptional, IsBoolean} from 'class-validator';
import { BaseEntity } from 'typeorm';


export class CreateAreaDto extends BaseEntity {
    
    @IsString()
    readonly name:string;

    @IsString()
    readonly description:string;

    @IsBoolean()
    readonly is_active:boolean;


}
