import { ApiProperty } from "@nestjs/swagger";
import { ISignInRequest } from "../interfaces";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto implements ISignInRequest {
    
    @ApiProperty({
        description: 'User Email',
        example: 'admin@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User Password',
        example: 'admin123',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}