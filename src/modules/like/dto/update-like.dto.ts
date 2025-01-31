import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDto } from './create-like.dto';
import { IUpdateLikeRequest } from '../interfaces';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLikeDto implements Omit<IUpdateLikeRequest, 'id'> {

    @ApiProperty({
        description: 'Product Item Id',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    productItemId: number;

    @ApiProperty({
        description: 'User Id',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    userId: number;
}
