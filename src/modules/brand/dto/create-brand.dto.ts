import { ApiProperty } from "@nestjs/swagger";
import { IBrand } from "../interfaces";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto implements IBrand{
    @ApiProperty({
        type: String,
        format: 'binary',
        required: true,
        description: 'Brand image',
    })
    @IsNotEmpty()
    @IsString()
    image: any;

    @ApiProperty({
        description: 'Brand name',
        required: true,
        default: 'Apple'
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}
