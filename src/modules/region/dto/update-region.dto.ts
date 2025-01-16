import { ApiProperty } from '@nestjs/swagger';
import { IUpdateRegionRequest } from '../interfaces';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto implements Omit<IUpdateRegionRequest, 'id'> {

    @ApiProperty({
        description: 'Enter Region name ',
        default: 'Toshkent',
        required: false
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        required: false,
        description: 'Enter Region Id ',
        default: 1
    })
    @IsOptional()
    @IsNumber()
    parentId: number;
} 
