import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IUpdateAddressRequest } from '../interfaces';

export class UpdateAddressDto implements Omit<IUpdateAddressRequest, 'id'> {

    @ApiProperty({
        description: 'Enter Address name ',
        default: 'Toshkent',
        required: false
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        required: false,
        description: 'Enter City Id ',
        default: 1
    })
    @IsOptional()
    @IsNumber()
    cityId: number;

    @ApiProperty({
        required: false,
        description: 'Enter Village Id ',
        default: 1
    })
    @IsOptional()
    @IsNumber()
    villageId: number;

    @ApiProperty({
        required: false,
        description: 'Enter User Id ',
        default: 1
    })
    @IsOptional()
    @IsNumber()
    userId: number;
} 
