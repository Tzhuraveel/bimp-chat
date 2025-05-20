import { PaginationHelper } from "../../common/helpers/pagination.helper.js";
import { HttpError } from "../../common/http/http-error.js";
import { db } from "../../infra/database/db.js";
import { fileStorageService } from "../file-storage/file-storage.service.js";
import { MessageTypes } from "./constants/constants.js";
import { messageRepository } from "./message.repository.js";

class MessageService {
  constructor(messageRepository, fileStorageService) {
    this.messageRepository = messageRepository;
    this.fileStorageService = fileStorageService;
  }

  async getContentById(id, reply) {
     const message = await this.getOneByIdOrThrow(id)
    
      if (message.type === MessageTypes.TEXT) {
        return reply
          .code(200)
          .type('text/plain')
          .send(message.text);
      }
    
      if (message.type === MessageTypes.FILE) {
        const stream = this.fileStorageService.read(message.filepath)

        return reply
          .code(200)
          .type(message.mimetype || 'application/octet-stream')
          .send(stream);
      }
  }

  async getAllWithPagination(pageOptions) {
    const [items, itemCount] = await Promise.all([
      db.message.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (pageOptions.page - 1) * pageOptions.take,
        take: pageOptions.take,
      }),
      db.message.count()
    ]);

    const pageMeta = PaginationHelper.toMetaResponse({
      pageOptions,
      itemCount,
    })

    return PaginationHelper.toResponse({
      items,
      meta: pageMeta,
    })
  }

  async createTextMessage(user, body) {
    const message = await this.messageRepository.create({userId: user.id, type: MessageTypes.TEXT, ...body})

    return message
  }


  async createFileMessage(userId, file) {
    if (!file) {
      throw new HttpError(400, 'File is required')
    }
      
    const filepath = await this.fileStorageService.save(file, userId)

    const message = await this.messageRepository.create({
      userId, 
      filename: file.filename,
      mimetype: file.mimetype,
      filepath,
      type: MessageTypes.FILE, 
    })

    return message
  }

  async getOneByIdOrThrow(id) {
    const message = await this.messageRepository.findOneById(id)

    if(!message) {
      throw new HttpError(403, 'Message not found')
    }

    return message
  }
}

export const messageService = new MessageService(messageRepository, fileStorageService)