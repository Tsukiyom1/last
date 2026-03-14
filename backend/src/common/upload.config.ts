import { diskStorage } from "multer";
import { extname, join } from "path";
import {randomUUID} from 'crypto'

export const uploadStorage = diskStorage({
  destination:(req,file,cb) => {
    cb(null, join(process.cwd(), "public", "uploads"));
  },
  filename:(req,file,cb) => {
    cb(null, randomUUID() + extname(file.originalname))
  }
})