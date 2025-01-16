import { ApiProperty } from "@nestjs/swagger";
import { ICreateCategoryRequest } from "../interface";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
        default : null
    })
    @IsNumber()
    @IsOptional()
    parentId: number;
}
