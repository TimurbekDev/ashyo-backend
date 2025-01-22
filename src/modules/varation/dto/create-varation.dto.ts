import { ApiProperty } from "@nestjs/swagger";
import { ICreateVarationRequest } from "../interfaces";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVarationDto implements ICreateVarationRequest {

    @ApiProperty({
        description : 'Enter Varation name ',
        default : 'Ram',
        required : true
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required : true,
        description : 'Enter Category Id ',
        default : 1
    })
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;
}
