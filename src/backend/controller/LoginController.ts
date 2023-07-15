import { NextApiRequest, NextApiResponse } from "next";
import LoginService from "@/backend/service/LoginService";
import IUser from "@/backend/interfaces/IUser.interface";
import HttpStatus from "@/backend/enum/HttpStatus";
import ErrorMessages from "@/backend/enum/ErrorMessages";

class LoginController {
  req: NextApiRequest;
  res: NextApiResponse;
  service: LoginService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.service = new LoginService();
  }

  public async loginControler() {
    const user: IUser = { ...this.req.body };

    try {
      const response = await this.service.loginService(user);
      if (response) {
        return this.res.status(HttpStatus.OK).json({ ...response });
      }

      return this.res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: ErrorMessages.INCORRECT_EMAIL_OR_PASSWORD });
    } catch (error) {
      return this.res
        .status(HttpStatus.INTERNAL_ERROR)
        .json({ message: ErrorMessages.INTERNAL_ERROR });
    }
  }
}

export default LoginController;
