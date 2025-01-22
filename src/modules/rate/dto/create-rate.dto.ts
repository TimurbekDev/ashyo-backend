import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ICreateRateRequest } from "../interfaces";
import { Transform } from "class-transformer";

export class CreateRateDto implements ICreateRateRequest {

    @ApiProperty({
        description: 'Product Id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @ApiProperty({
        description: 'User Id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'Value',
        type : Number,
        default: 5
    })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    value: number
}
