import { ApiProperty } from '@nestjs/swagger';
import { IUpdateCategoryRequest } from '../interface';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

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
    })
    icon: Express.Multer.File

    @ApiProperty({
        type: String,
        description: 'Category Image path ',
        required: false,
        format: "binary",
    })
    image: Express.Multer.File

    @ApiProperty({
        type: Number,
        description: 'Parent category Id',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    parentId: number;
}   
