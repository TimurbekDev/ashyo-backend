import { ApiProperty } from "@nestjs/swagger";
import { ICreateBannerRequest } from "../interfaces";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateBannerDto implements ICreateBannerRequest {

    @ApiProperty({
        type: String,
        description: 'Product name'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Product description'
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        type: Number,
        description: 'Product id'
    })
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    productId: number;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Banner image'
    })
    image: Express.Multer.File | string;
}
