import { NextApiRequest, NextApiResponse } from "next";
import RegisterService from "@/backend/service/RegisterService";
import HttpStatus from "../enum/HttpStatus";
import ErrorMessages from "../enum/ErrorMessages";

class RegisterController {
  req: NextApiRequest;
  res: NextApiResponse;
  service: RegisterService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.service = new RegisterService();
  }

  public async registerUser() {
    const { body } = this.req;

    try {
      const response = await this.service.registerUser(body);

      if (response) {
        return this.res.status(HttpStatus.CREATED).json({ response });
      }

      return this.res
        .status(HttpStatus.CONFLIT)
        .json({ message: ErrorMessages.USER_ALREADY_EXISTS });
    } catch (error) {
      console.log(error);
      return this.res
        .status(HttpStatus.INTERNAL_ERROR)
        .json({ message: ErrorMessages.INTERNAL_ERROR });
    }
  }
}

export default RegisterController;
