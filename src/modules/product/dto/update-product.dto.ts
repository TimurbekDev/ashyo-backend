import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IUpdateProductRequest } from '../interfaces';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto implements Omit<IUpdateProductRequest, 'id'> {

    @ApiProperty({
        description: 'Api',
        default: 'Redmi Not 13',
        required: false
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Product Description',
        default: 'Lorem20',
        required: true
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'category Id',
        default: 1,
        required: true
    })
    @IsOptional()
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        description: 'Brend Id',
        default: 1,
        required: true
    })
    @IsOptional()
    @IsNumber()
    brendId: number;

    @ApiProperty({
        type: 'string',
        required: true,
        format: 'binary',
        description: 'Product Image',
    })
    @IsOptional()
    image: any;
}
