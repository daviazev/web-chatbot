import { Schema } from "mongoose";
import AbstractODM from "./AbstractODM";
import IUser from "@/backend/interfaces/IUser.interface";

class RegisterODM extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema<IUser>({
      username: { type: String, required: true },
      password: { type: String, required: true },
      createdAt: { type: Date, required: true },
    });
    super(schema, "Users");
  }
}

export default RegisterODM;
