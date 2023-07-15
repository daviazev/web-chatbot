import { Schema } from "mongoose";
import AbstractODM from "./AbstractODM";
import IUser from "../interfaces/IUser.interface";

class LoginODM extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema<IUser>({
      _id: { type: String, required: true },
      username: { type: String, required: true },
      password: { type: String, required: true },
    });
    super(schema, "Users");
  }

  public async getUserByUsername(username: string) {
    const user = await this.model.findOne({ username });
    return user;
  }
}

export default LoginODM;
