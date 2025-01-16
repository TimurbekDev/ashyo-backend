import { ApiProperty } from '@nestjs/swagger';
import { IUpdateCategoryRequest } from '../interface';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto implements Omit<IUpdateCategoryRequest, 'id'> {

    @ApiProperty({
        description: 'Category name',
        required: false,
        default: 'Phone'
    })
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty({
        description: 'Category Icon path',
        required: false,
        default : null
    })
    @IsString()
    @IsOptional()
    icon: string

    @ApiProperty({
        description: 'Category Image path ',
        required: false,
        default: null
    })
    @IsString()
    @IsOptional()
    image: string

    @ApiProperty({
        description: 'Parent category Id',
        required: false,
        default : null
    })
    @IsNumber()
    @IsOptional()
    parentId: number;
}
