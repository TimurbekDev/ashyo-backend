import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IUpdateUser } from '../interfaces/me-response.interfaces';

export class UpdateMeDto implements IUpdateUser    {
        id: number
        @ApiProperty({
            type: String,
            format: "binary",
            required: false,
        })
        @IsOptional()
        image: Express.Multer.File;
        @ApiProperty({
            type: String,
            required: false,
        })
        @IsEmail()
        @IsOptional()
        email: string;
        @ApiProperty({
            type: "string",
            required: false,
        })
        @IsString()
        @IsOptional()
        fullName: string;
    
        @ApiProperty({
            type: "string",
            required: false,
        })
        @IsString()
        @IsOptional()
        password: string;
}
