import { ApiProperty } from "@nestjs/swagger";
import { ICreateOrderRequest } from "../interfaces";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto implements ICreateOrderRequest {

    @ApiProperty({
        description: 'Cart ID',
        default: 2,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    cartId: number;

    @ApiProperty({
        description: 'Adress ID',
        default: 2,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    adressId: number;
}
