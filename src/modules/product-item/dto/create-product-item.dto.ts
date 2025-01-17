import { ApiProperty } from "@nestjs/swagger";
import { ICreatePrRequest } from "../interfaces";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    productId: number;

    @ApiProperty({
        type: 'string',
        description: 'Product Item image',
        format: 'binary'
    })
    @IsNotEmpty()
    image: any;

    @ApiProperty({
        description: 'Price',
        required: true,
        default: 10000
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({
        description: 'Quantity',
        required: true,
        default: 10
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Varaions id',
        type: [Number],
    })
    @IsArray()
    varations: number[]
}
