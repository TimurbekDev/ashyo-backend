import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class VerifyUserDto {
    
    @ApiProperty({
        description: 'User Email',
    })
    @IsNotEmpty()
    @IsEmail()
    token: string;

    @ApiProperty({
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    // @Transform(({value})=>Math.abs(parseInt(value)))
    id: number;
    
}