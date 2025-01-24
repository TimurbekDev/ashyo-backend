import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IUpdateBannerRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateBannerDto implements Omit<IUpdateBannerRequest, 'id'> {
    @ApiProperty({
        type: String,
        description: 'Product name'
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Product description'
    })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        type: Number,
        description: 'Product id'
    })
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    productId: number;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'Banner image'
    })
    image: Express.Multer.File | string;
}
