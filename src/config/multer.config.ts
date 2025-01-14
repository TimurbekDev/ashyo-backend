import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination(req, file, callback) {
      return callback(null, './uploads');
    },
    filename: function (req, file, cb) {
      const extName = extname(file.originalname);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + extName);
    },
  }),
};