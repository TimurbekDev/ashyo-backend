import { ApiProperty } from "@nestjs/swagger";
import { ICreateProductRequest } from "../interfaces";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductDto implements ICreateProductRequest {

    @ApiProperty({
        description: 'Api',
        default: 'Redmi Not 13',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Product Description',
        default: 'Lorem20',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'category Id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Math.abs(parseInt(value)))
    categoryId: number;

    @ApiProperty({
        description: 'Brend Id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({value})=>Math.abs(parseInt(value)))
    brendId: number;

    @ApiProperty({
        type: 'string',
        required: true,
        format: 'binary',
        description: 'Product Image',
    })
    image: Express.Multer.File;
}
