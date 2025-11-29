import multer from 'multer';
import createHttpError from 'http-errors';

export const upload = multer({
  storage: multer.memoryStorage(), // файлы в памяти
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new createHttpError(400, 'Only images allowed'));
    }
  },
});
