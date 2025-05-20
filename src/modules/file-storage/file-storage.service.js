import fs from 'node:fs';
import path, { extname } from 'node:path';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';
import { randomUUID } from 'node:crypto';
import { HttpError } from '../../common/http/http-error.js';

const pump = promisify(pipeline);

class FileStorageService {
  constructor(baseDir = './uploads') {
    this.baseDir = baseDir;

    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  buildPathForUpdate(fileName, itemId) {
    const extension = extname(fileName);
    const uniqueName = `${randomUUID()}${extension}`;
    return path.join(itemId.toString(), uniqueName);
  }

  read(relativePath) {
    const absolutePath = path.join(this.baseDir, relativePath);

    if (!fs.existsSync(absolutePath)) {
      throw new HttpError(403, 'File not found');
    }

    return fs.createReadStream(absolutePath);
  } 

  async save(file, itemId) {
    const relativePath = this.buildPathForUpdate(file.filename, itemId);
    const absolutePath = path.join(this.baseDir, relativePath);

    const dir = path.dirname(absolutePath);
    fs.mkdirSync(dir, { recursive: true });

    const writeStream = fs.createWriteStream(absolutePath);
    await pump(file.file, writeStream);

    return relativePath;
  }
}

export const fileStorageService = new FileStorageService()