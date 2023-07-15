import LoginODM from "@/backend/model/LoginODM";
import IUser from "../interfaces/IUser.interface";
import { compare } from "bcryptjs";

class LoginService {
  private model: LoginODM;

  constructor() {
    this.model = new LoginODM();
  }

  private async comparePassword(inputPassword: string, hashFromBD: string) {
    try {
      const result = await compare(inputPassword, hashFromBD);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async loginService(userInfos: IUser) {
    const findUser = await this.model.getUserByUsername(userInfos.username);

    const isPasswordCorrect = await this.comparePassword(
      userInfos.password as string,
      findUser?.password as string
    );

    if (findUser) {
      findUser.password = undefined;
    }

    if (findUser && isPasswordCorrect) return findUser.toObject();

    return null;
  }
}

export default LoginService;
