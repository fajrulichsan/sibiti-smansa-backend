import { Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '../s3/s3.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('tinymce')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './tmp', // Direktori sementara
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    const filePath = path.join(__dirname, '..', '..', 'tmp', file.filename);

    try {
      const result = await this.s3Service.uploadFile(filePath, file.originalname, "tinymce");
      fs.unlinkSync(filePath); // Hapus file setelah di-upload
      return { url: result }; // Kembalikan URL foto yang diupload
    } catch (error) {
      throw new HttpException(`Error uploading file: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

