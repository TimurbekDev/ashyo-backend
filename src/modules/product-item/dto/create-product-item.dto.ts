import { ApiProperty } from "@nestjs/swagger";
import { ICreatePrRequest } from "../interfaces";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

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
    @IsNumberString()
    productId: number;

    @ApiProperty({
        type: 'string',
        description: 'Product Item image',
        format: 'buffer'
    })
    @IsNotEmpty()
    image: any;

    @ApiProperty({
        description: 'Price',
        required: true,
        default: 10000
    })
    @IsNotEmpty()
    @IsNumberString()
    price: number;

    @ApiProperty({
        description: 'Quantity',
        required: true,
        default: 10
    })
    @IsNotEmpty()
    @IsNumberString()
    quantity: number;
}
