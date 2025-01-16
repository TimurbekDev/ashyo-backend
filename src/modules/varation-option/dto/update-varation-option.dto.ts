import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IUpdateVoRequest } from '../interfaces';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVarationOptionDto implements Omit<IUpdateVoRequest, 'id'> {

    @ApiProperty({
        description: 'Varation Option value',
        example: 'RAM 5',
        required: false
    })
    @IsOptional()
    @IsString()
    value: string;

    @ApiProperty({
        description: 'Varation Id',
        required: false,
        example: 1
    })
    @IsOptional()
    @IsNumber()
    varationId: number;
}
