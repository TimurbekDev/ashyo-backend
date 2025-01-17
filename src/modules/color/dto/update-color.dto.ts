import { ApiProperty } from '@nestjs/swagger';
import { IUpdateColorRequest } from '../interfaces';
import { IsOptional, IsString } from 'class-validator';

export class UpdateColorDto implements Omit<IUpdateColorRequest, 'id'> {

    @ApiProperty({
        description: 'Color name ',
        default: 'black',
        required: false
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Color code ',
        default: '#ffffff',
        required: false
    })
    @IsOptional()
    @IsString()
    code: string;
}
