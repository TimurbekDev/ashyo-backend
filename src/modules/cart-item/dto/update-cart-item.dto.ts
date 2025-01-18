import { IUpdateCartItemRequest } from '../interfaces';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartItemDto implements Omit<IUpdateCartItemRequest, 'id'> {

    @ApiProperty({
        description: 'Product Id',
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
    cartId: number;

    @ApiProperty({
        description: 'Count',
        default: 10,
    })
    @IsOptional()
    @IsNumber()
    count: number;
}
