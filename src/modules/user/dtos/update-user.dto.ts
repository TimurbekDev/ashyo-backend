import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUpdateUserRequest } from '../interfaces';

export class UpdateUserDto implements Omit<IUpdateUserRequest, 'id'> {

  @ApiProperty({
    type: String,
    example: 'John',
    required:false,
    description: 'Enter your full name',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    type: String,
    required:false,
    example: 'example@gmail.com',
    description: 'Email Required',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    required:false,
    example: 'mysecret',
    description: 'Password Required',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type:'string',
    required:false,
    format: 'binary',
    description: 'Image is optional',
  })
  @IsOptional()
  image: any;
}
