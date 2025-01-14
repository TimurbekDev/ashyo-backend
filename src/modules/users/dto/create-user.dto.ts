import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ICreateUser } from '../interfaces/create-user.interfaces';

export class CreateUserDto implements  ICreateUser{
  @ApiProperty({
    type: String,
    example: 'John',
    description: 'user nomi ixtiyoriy',
  })
  @IsString()
  name: string;
  @ApiProperty({
    type: String,
    example: 'example@gmail.com',
    required: true,
    description: 'email majburiy',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'mysecret',
    description: 'parol majburiy',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'binary',
    description: 'user rasmi ixtiyoriy',
  })
  @IsString()
  image: string;
}
