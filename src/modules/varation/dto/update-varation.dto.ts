import { ApiProperty } from '@nestjs/swagger';
import { IUpdateVarationRequest } from '../interfaces';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVarationDto implements Omit<IUpdateVarationRequest, 'id'> {

    @ApiProperty({
        description: 'Enter Varation name ',
        default: 'Ram',
        required: false
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        required: false,
        description: 'Enter Category Id ',
        default: 1
    })
    @IsOptional()
    @IsNumber()
    categoryId: number;
} 
