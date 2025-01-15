import { IsNotEmpty, IsString } from 'class-validator';
import { RemoveFileRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class RemoveFileDto implements RemoveFileRequest {
  @ApiProperty({ type: 'string', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  fileName: string;
}