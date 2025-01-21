import { ApiProperty } from "@nestjs/swagger";
import { ICreatePrRequest } from "../interfaces";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateProductItemDto implements ICreatePrRequest {

    @ApiProperty({
        description: 'Product Item name',
        required: true,
        default: '4G'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Product Id',
        required: true,
        default: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Math.abs(parseInt(value)))
    productId: number;

    @ApiProperty({
        type: 'string',
        description: 'Product Item image',
        format: 'binary'
    })
    image: Express.Multer.File;

    @ApiProperty({
        description: 'Price',
        required: true,
        default: 10000
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Math.abs(parseInt(value)))
    price: number;

    @ApiProperty({
        description: 'Quantity',
        required: true,
        default: 10
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Math.abs(parseInt(value)))
    quantity: number;

    @ApiProperty({
        description: 'Varaions id',
        type: [Number],
    })
    @IsArray()
    @Transform(({ value }) => {
        return Array.isArray(value) ? value.map(Number) : [];
    }, { toClassOnly: true })
    varations: number[]

    @ApiProperty({
        description: 'Color Id',
        default: 1
    })
    @Transform(({ value }) => Math.abs(parseInt(value)))
    colorId: number;
}
