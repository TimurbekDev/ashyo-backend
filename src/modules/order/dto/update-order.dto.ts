import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IUpdateOrderRequest } from '../interfaces';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { $Enums } from '@prisma/client';

export class UpdateOrderDto implements Omit<IUpdateOrderRequest, 'id'> {

    @ApiProperty({
        description: 'Status of Order',
        default: $Enums.OrderStatus.Delivered,
        enum: $Enums.OrderStatus
    })
    @IsEnum($Enums.OrderStatus)
    status: $Enums.OrderStatus;
}
