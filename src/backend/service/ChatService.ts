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

  public async getConversationsByUserId(id: string) {
    const allConversations = await this.model.getConversationsByUserId(id);
    return allConversations;
  }
}

export default ChatService;
