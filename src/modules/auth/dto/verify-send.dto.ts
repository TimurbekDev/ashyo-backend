import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class VerifySendDto {
    
    @ApiProperty({
        description: 'User Email',
        example: 'timurbek@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

}