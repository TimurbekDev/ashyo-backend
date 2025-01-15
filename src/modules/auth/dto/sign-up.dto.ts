import { ApiProperty } from "@nestjs/swagger";
import { ISignUpRequest } from "../interfaces";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto implements ISignUpRequest {

    @ApiProperty({
        description: 'User full_name : ',
        example: 'Timurbek Saburov',
    })
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty({
        description: 'User Email',
        example: 'timurbek@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User Password',
        example: 'Timurbek123@',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}
