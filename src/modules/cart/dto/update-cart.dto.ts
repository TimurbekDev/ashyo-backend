import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { IUpdateCartRequest } from '../interfaces';

export class UpdateCartDto implements Omit<IUpdateCartRequest, 'id'> {

    @ApiProperty({
        required: false,
        description: 'Enter User Id ',
        default: 1
    })
    @IsOptional()
    @IsNumber()
    userId: number;
} 