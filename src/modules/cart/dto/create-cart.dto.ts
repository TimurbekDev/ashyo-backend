import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ICreateCartRequest } from "../interfaces";

export class CreateCartDto implements ICreateCartRequest {

    @ApiProperty({
        required : true,
        description : 'Enter User Id ',
        default : 1
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
