import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IBrand } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBrandDto implements IBrand {
       @ApiProperty({
            type: String,
            format: 'binary',
            description: 'Brand image',
        })
        @IsOptional()
        @IsString()
        image: any;
    
        @ApiProperty({
            description: 'Brand name',
            default: 'Apple'
        })
        @IsString()
        @IsOptional()
        name: string;
}
