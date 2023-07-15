import { NextApiRequest, NextApiResponse } from "next";
import ChatService from "../service/ChatService";
import HttpStatus from "../enum/HttpStatus";
import ErrorMessages from "../enum/ErrorMessages";

class ChatController {
  req: NextApiRequest;
  res: NextApiResponse;
  service: ChatService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.service = new ChatService();
  }

  public async postChatConversationController() {
    const { body } = this.req;

    try {
      const response = await this.service.postChatConversation(body);
      return this.res.status(HttpStatus.CREATED).json({ response });
    } catch (error) {
      return this.res
        .status(HttpStatus.INTERNAL_ERROR)
        .json({ message: ErrorMessages.INTERNAL_ERROR });
    }
  }

  public async getConversationsByUserId() {
    const { userId } = this.req.query;

    try {
      const response = await this.service.getConversationsByUserId(
        userId as string
      );
      return this.res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return this.res
        .status(HttpStatus.INTERNAL_ERROR)
        .json({ message: ErrorMessages.INTERNAL_ERROR });
    }
  }
}

export default ChatController;
