import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ICreateAddressRequest } from "../interfaces";

export class CreateAddressDto implements ICreateAddressRequest {
    @ApiProperty({
        required : true,
        description : 'Enter City Id ',
        default : 1
    })
    @IsNotEmpty()
    @IsNumber()
    cityId: number;

    @ApiProperty({
        required : true,
        description : 'Enter Village Id ',
        default : 1
    })
    @IsNotEmpty()
    @IsNumber()
    villageId: number;

    @ApiProperty({
        required : true,
        description : 'Enter User Id ',
        default : 1
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}
