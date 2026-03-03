import { IsDefined, IsUUID } from 'class-validator';

export class RelationIdDto {
    
    @IsDefined()
    @IsUUID()
    id: number;
}