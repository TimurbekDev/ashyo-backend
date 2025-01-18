import { ApiProperty } from "@nestjs/swagger";
import { ICreateOiRequest } from "../interfaces";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderItemDto implements ICreateOiRequest {

    @ApiProperty({
        description: 'Order id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    orderId: number;

    @ApiProperty({
        description: 'ProductItem id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    productItemId: number;

    @ApiProperty({
        description: 'Quantity',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
