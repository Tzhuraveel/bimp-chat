import { db } from "../../infra/database/db.js";

export class UserRepository {
  async findOneById(id) {
    return await db.user.findUnique({ where: { id } });
  }

  async findOneByUsername(username) {
    return db.user.findUnique({ where: { username } });
  }

  async create(data) {
    return db.user.create({data});
  }
}

export const userRepository = new UserRepository()
