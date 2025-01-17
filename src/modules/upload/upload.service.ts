import * as fs from 'fs/promises';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import {
  RemoveFileRequest,
  RemoveFileResponse,
  UploadFileRequest,
  UploadFileResponse,
} from './interfaces';
import { existsSync } from 'fs';

@Injectable()
export class UploadService {
  constructor() {}

  async uploadFile(payload: UploadFileRequest): Promise<UploadFileResponse> {
    const extName = path.extname(payload.file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = payload.file.fieldname + '-' + uniqueSuffix + extName;

    const fullFilePath = path.join(
      __dirname,
      '../../../uploads/',
      payload.destination,
      fileName,
    );

    const directoryPath = path.join(__dirname, '../../../uploads/', payload.destination);

    if (!existsSync(directoryPath)) {
      await fs.mkdir(directoryPath, { recursive: true });
    }

    try {
      await fs.writeFile(fullFilePath, payload.file.buffer);
    } catch (error) {
      throw new Error('Error writing file: ' + error.message);
    }

    const imageUrl = `${payload.destination}/${fileName}`;
    return {
      imageUrl,
      message: 'Successfully uploaded',
    };
  }

  async deleteFile(payload: RemoveFileRequest): Promise<RemoveFileResponse> {
    const filePath = path.join(__dirname, '../../../uploads/', payload.fileName);
  
    if (!existsSync(filePath)) {
      console.log(filePath)
      throw new Error('File does not exist');
    }

    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.log(error)
      throw new Error('Error deleting file: ' + error.message);
    }

    return {
      message: 'File removed successfully',
    };
  }
}
// C:\Users\Nodirbek Savbatov\OneDrive\Рабочий стол\ashyo-backend\brands\image-1737046062146-834267334.png
// C:\Users\Nodirbek Savbatov\OneDrive\Рабочий стол\ashyo-backend\uploads\brands\image-1737046062146-834267334.png
