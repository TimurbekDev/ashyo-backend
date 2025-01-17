import { ApiProperty } from "@nestjs/swagger";
import { ICreateCategoryRequest } from "../interface";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
        type: Number,
        description: 'Parent category Id',
        required: false,
        nullable: true,
    })
    parentId: number | null;
    

    @ApiProperty({
        type: String, 
        format: "binary",
        description: "Category image required",
        required: true,
    })
    @IsNotEmpty()
    image: any

    @ApiProperty({
        type: String, 
        format: "binary",
        description: "Category icon required",
        required: true,
    })
    @IsNotEmpty()
    icon: any
}
