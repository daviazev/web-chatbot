import RegisterODM from "@/backend/model/RegisterODM";
import LoginODM from "@/backend/model/LoginODM";
import IUser from "@/backend/interfaces/IUser.interface";
import ErrorMessages from "@/backend/enum/ErrorMessages";
import dotenv from "dotenv";
import { genSalt, hash } from "bcryptjs";

dotenv.config();
const SALT_ROUNDS = process.env.SALT_ROUNDS;

class RegisterService {
  private model: RegisterODM;

  constructor() {
    this.model = new RegisterODM();
  }

  private generateHash = async (password: string) => {
    try {
      const salt = await genSalt(Number(SALT_ROUNDS));
      const createHash = await hash(password, salt);
      return createHash;
    } catch (err) {
      console.log(err);
      throw new Error(ErrorMessages.HASH_ERROR);
    }
  };

  public async registerUser(user: IUser): Promise<IUser | null> {
    const loginODMInstance = new LoginODM();
    const userAlreadyExists = await loginODMInstance.getUserByUsername(
      user.username
    );

    if (userAlreadyExists) return null;

    const encryptedPassword = await this.generateHash(user.password as string);

    const newUser = await this.model.create({
      ...user,
      password: encryptedPassword,
      createdAt: new Date(),
    });

    newUser.password = undefined;

    return newUser;
  }
}

export default RegisterService;
