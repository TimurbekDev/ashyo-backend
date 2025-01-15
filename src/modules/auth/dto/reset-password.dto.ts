import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IResetPasswordRequest } from "../interfaces";
import { SignInDto } from "./sign-in.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto implements IResetPasswordRequest {

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

    @ApiProperty({
        description: 'OTP',
        example: 885858,
    })
    @IsNotEmpty()
    @IsString()
    code: number;
}