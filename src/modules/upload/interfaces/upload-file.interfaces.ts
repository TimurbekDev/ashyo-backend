export declare interface UploadFileRequest {
    file: Express.Multer.File;
    destination: string;
  }
  
  export declare interface UploadFileResponse {
    message: string;
    imageUrl: string;
  }