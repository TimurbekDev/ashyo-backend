import { ApiProperty } from "@nestjs/swagger";
import { ICreateColorRequest } from "../interfaces";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColorDto implements ICreateColorRequest {

    @ApiProperty({
        description: 'Color name ',
        default: 'black',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Color code ',
        default: '#ffffff',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    code: string;
}
