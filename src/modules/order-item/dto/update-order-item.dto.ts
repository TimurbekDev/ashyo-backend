import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IUpdateOiRequest } from '../interfaces';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderItemDto implements Omit<IUpdateOiRequest,'id'> {

    @ApiProperty({
        description: 'Order id',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    orderId: number;

    @ApiProperty({
        description: 'ProductItem id',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    productItemId: number;

    @ApiProperty({
        description: 'Quantity',
        default: 1,
    })
    @IsOptional()
    @IsNumber()
    quantity: number;
}
