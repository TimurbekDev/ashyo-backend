import { ApiProperty } from "@nestjs/swagger";
import { ICreateReviewRequest } from "../interfaces";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateReviewDto implements ICreateReviewRequest {

    @ApiProperty({
        description : 'Conetent',
        required : true,
        default : 'Good thing'
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({
        description : 'User Id',
        required : true,
        default : 16
    })
    @IsNotEmpty()
    @IsString()
    userId: number;

    @ApiProperty({
        description : 'Product Id',
        required : true,
        default : 10
    })
    @IsNotEmpty()
    @IsString()
    productId: number;
}
