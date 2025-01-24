import { ApiProperty } from "@nestjs/swagger";
import { ICreateCategoryRequest } from "../interface";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateCategoryDto implements ICreateCategoryRequest {

    @ApiProperty({
        description: 'Category name',
        required: true,
        default: 'Phone'
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'Parent category Id',
        required: false,
        type: Number,
    })
    @IsNumber()
    parentId: number;


    @ApiProperty({
        type: String,
        format: "binary",
        description: "Category image required",
        required: true,
    })
    image: any

    @ApiProperty({
        type: String,
        format: "binary",
        description: "Category icon required",
        required: true,
    })
    icon: any
}
