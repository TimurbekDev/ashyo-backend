import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductItemDto } from './create-product-item.dto';
import { IUpdatePrRequest } from '../interfaces';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

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
    image: Express.Multer.File;

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

    @ApiProperty({
        description: 'Color Id',
        required: false,
        default: 1
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    colorId: number;
}
