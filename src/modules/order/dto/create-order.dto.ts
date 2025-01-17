import { ApiProperty } from "@nestjs/swagger";
import { ICreateOrderRequest } from "../interfaces";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto implements ICreateOrderRequest {

    @ApiProperty({
        description: 'Adress ID',
        default: 2,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    adressId: number;

    @ApiProperty({
        description: 'User ID',
        default: 2,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'Toatal price',
        default: 2000000,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;
}
