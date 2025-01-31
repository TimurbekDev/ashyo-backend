import { ApiProperty } from "@nestjs/swagger";
import { IConnectSupport } from "../interfaces";
import { IsOptional } from "class-validator";

export class ConnectSupport implements IConnectSupport{
    @ApiProperty({
        type: String,
        required: true,
        description: 'Name of the user'
    })
    name: string;
    @IsOptional()
    @ApiProperty({
        type: String,
        required: true,
        description: 'Email of the user'
    })
    email: string;
    @IsOptional()
    @ApiProperty({
        type: String,
        required: true,
        description: 'Phone number of the user'
    })
    phone: string;
    @IsOptional()
    @ApiProperty({
        type: String,
        required: true,
        description: 'Surname of the user'
    })
    surname: string;
    @ApiProperty({
        type: String,
        required: true,
        description: 'Text of the user'
    })
    text: string;

    @IsOptional()
    to: string;
    @IsOptional()
    subject: string;
}