import ChatODM from "../model/ChatODM";
import IChat from "../interfaces/IChat.interface";

class ChatService {
  private model: ChatODM;

  constructor() {
    this.model = new ChatODM();
  }

  public async postChatConversation(chat: IChat) {
    const newConversation = await this.model.create({ ...chat });
    return newConversation;
  }
}

export default ChatService;
