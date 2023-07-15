import { Schema } from "mongoose";
import IChat from "../interfaces/IChat.interface";
import AbstractODM from "./AbstractODM";

const messageSchema = new Schema({
  text: String,
  createdAt: Date,
  chatBotText: Boolean,
});

class ChatODM extends AbstractODM<IChat> {
  constructor() {
    const schema = new Schema<IChat>({
      userId: { type: String, required: true },
      conversation: {
        type: [messageSchema],
        required: true,
      },
      createdAt: Date,
    });

    super(schema, "Chats");
  }
}

export default ChatODM;
