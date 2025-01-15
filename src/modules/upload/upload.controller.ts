import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RemoveFileRequest, RemoveFileResponse, UploadFileResponse } from './interfaces';
import { UploadService } from './upload.service';

import { FileInterceptor } from '@nestjs/platform-express';

import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './dto';

@ApiTags("Upload")
@Controller('uploads')
export class UploadController {
  constructor(private service: UploadService) {}
  @ApiOperation({ summary: 'Yangi file yaratish' })
  @ApiConsumes("multipart/form-data")
  @Post('/add')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() payload: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileResponse> {
    return await this.service.uploadFile({ ...payload, file });
  }
  @ApiOperation({ summary: 'mavjud faylni o\'chirish' })
  @Delete('/remove')
  async removeFile(
    @Body() payload: RemoveFileRequest,
  ): Promise<RemoveFileResponse> {
    return this.service.deleteFile(payload);
  }
}