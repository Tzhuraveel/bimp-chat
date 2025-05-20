import { PasswordHelper } from "../../common/helpers/password.helper.js"
import { userService } from "../user/user.service.js"

class AuthService {
  constructor(userService) {
    this.userService = userService
  }

  async register({ username, password }) {
    await this.userService.getOneByUsernameAndThrow(username)
        
    const hashedPassword = await PasswordHelper.hashPassword(password)

    const user = await this.userService.create({ username, hashPassword: hashedPassword })

    return user
  }

  async authenticate(username, password) {
    const user = await userService.findOneByUsername(username)
    if (!user) return null;

    const isEqual = await PasswordHelper.comparePassword(password, user.hashPassword);

    return isEqual ? user : null;
  }  
}

export const authService = new AuthService(userService)