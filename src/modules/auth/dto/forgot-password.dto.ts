import { ApiProperty } from "@nestjs/swagger";
import { IResetPasswordRequest } from "../interfaces";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDto implements Omit<IResetPasswordRequest, 'password'|'code'> {
    @ApiProperty({
        description: 'User Email',
        example: 'timurbek@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}