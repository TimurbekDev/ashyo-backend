import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ICreateUser } from '../interfaces/create-user.interfaces';

export class UpdateUserDto implements  ICreateUser{
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
    description: 'email majburiy',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'mysecret',
    description: 'parol majburiy',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    description: 'user rasmi ixtiyoriy',
  })
  @IsString()
  image: string;
}
