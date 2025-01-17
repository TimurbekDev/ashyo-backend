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
        type: String,
        format: "binary",
        description: 'Category Icon path',
        required: false,
        default : null
    })
    @IsOptional()
    icon: any

    @ApiProperty({
        type: String,
        description: 'Category Image path ',
        required: false,
       format: "binary",
    })
    @IsOptional()
    image: any

    @ApiProperty({
        type: Number,
        description: 'Parent category Id',
        required: false,
        default: null,
    })
    @IsNumber()
    @IsOptional()
    parentId: number | null;
}
