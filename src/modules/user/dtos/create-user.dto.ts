import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ICreateUserRequest } from '../interfaces';


export class CreateUserDto implements ICreateUserRequest {

  @ApiProperty({
    type: String,
    example: 'John',
    description: 'Enter your full name',
  })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty({
    type: String,
    example: 'example@gmail.com',
    required: true,
    description: 'Email Required',
  })
  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'mysecret',
    description: 'Password Required',
    required: true,
  })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({
    type:'string',
    required:true,
    format: 'binary',
    description: 'Image is optional',
  })
  @IsString()
  @IsOptional()
  image: any;
}
