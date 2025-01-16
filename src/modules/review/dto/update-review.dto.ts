import { ApiProperty } from '@nestjs/swagger';
import { IUpdateReviewRequest } from '../interfaces';
import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto implements Omit<IUpdateReviewRequest, 'id'> {

    @ApiProperty({
        description: 'Conetent',
        required: false,
        default: 'Good thing'
    })
    @IsOptional()
    @IsString()
    content: string;
}
