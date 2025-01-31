import { ApiProperty } from "@nestjs/swagger";
import { ICreateLikeRequest } from "../interfaces";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateLikeDto implements ICreateLikeRequest {

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
}

export class CreateLikeDtoByToken implements Omit<ICreateLikeRequest, 'userId'> {

    @ApiProperty({
        description: 'Product Id',
        default: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    productId: number;
}
