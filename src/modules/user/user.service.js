import { HttpError } from "../../common/http/http-error.js";
import { userRepository } from "./user.repository.js";

export class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async findOneByUsername(username) {
    const user = this.userRepository.findOneByUsername(username)
    
    return user
  }

  async getOneByIdOrThrow(id) {
    const user = this.userRepository.findOneById(id)

    if(!user) {
      throw new HttpError(403, 'User already exists')
    }

    return user
  }

  async getOneByUsernameAndThrow(username) {
    const user = await this.userRepository.findOneByUsername(username)
    
    if(user) {
      throw new HttpError(403, 'User alredy exists')
    }
  }

  async create(data) {
    return await this.userRepository.create(data)
  }
}

export const userService = new UserService(userRepository)
