import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductItemDto } from './create-product-item.dto';
import { IUpdatePrRequest } from '../interfaces';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateProductItemDto implements Omit<IUpdatePrRequest, 'id'> {

    @ApiProperty({
        description: 'Product Item name',
        required: false,
        default: '4G'
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        type: 'string',
        required: false,
        description: 'Product Item image',
        format: 'buffer'
    })
    @IsOptional()
    image: any;

    @ApiProperty({
        description: 'Price',
        required: true,
        default: 10000
    })
    @IsOptional()
    @IsNumberString()
    price: number;

    @ApiProperty({
        description: 'Quantity',
        required: true,
        default: 10
    })
    @IsOptional()
    @IsNumberString()
    quantity: number;
}
