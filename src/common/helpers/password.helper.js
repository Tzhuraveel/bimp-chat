import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  static async hashPassword(
    password,
    salt = 10,
  ) {
    return await bcrypt.hash(password, salt);
  }

  static async comparePassword(
    password,
    hashPassword,
  ) {
    return await bcrypt.compare(password, hashPassword);
  }
}
