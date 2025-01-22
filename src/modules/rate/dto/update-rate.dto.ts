import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdateRateRequest } from '../interfaces';
import { Transform } from 'class-transformer';

export class UpdateRateDto implements Omit<IUpdateRateRequest, 'id'> {

    @ApiProperty({
        description: 'Product Id',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    productId: number;

    @ApiProperty({
        description: 'User Id',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'Value',
        type: Number,
        default: 5
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    value: number
}
