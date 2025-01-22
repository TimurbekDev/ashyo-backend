import { ApiProperty } from "@nestjs/swagger";
import { ICreateVoRequest } from "../interfaces";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVarationOptionDto implements ICreateVoRequest {

    @ApiProperty({
        description : 'Varation Option value',
        example : '8',
        required : true
    })
    @IsNotEmpty()
    @IsString()
    value: string;

    @ApiProperty({
        description : 'Varation Id',
        required : true,
        example : 1
    })
    @IsNotEmpty()
    @IsNumber()
    varationId: number;
}
