import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ICreateCartItemRequest } from "../interfaces";

export class CreateCartItemDto implements ICreateCartItemRequest {

    @ApiProperty({
        description: 'Product Id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    productItemId: number;

    @ApiProperty({
        description: 'User Id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    cartId: number;

    @ApiProperty({
        description: 'Count',
        default: 10,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    count: number;
}
