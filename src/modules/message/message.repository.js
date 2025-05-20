import { db } from "../../infra/database/db.js";

export class MessageRepository {
  async findOneById(id) {
    return await db.message.findUnique({ where: { id } });
  }

  async create(data) {
    return db.message.create({data});
  }
}

export const messageRepository = new MessageRepository()
