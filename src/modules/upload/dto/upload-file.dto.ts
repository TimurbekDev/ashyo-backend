import { IsNotEmpty, IsString } from 'class-validator';
import { UploadFileRequest } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto implements Omit<UploadFileRequest, 'file'> {
  @ApiProperty({ type: 'string', required: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: any;
}