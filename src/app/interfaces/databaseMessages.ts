interface IMessageFromDb {
  _id: string;
  text: string;
  createdAt: string;
  isAChatBotText: boolean;
  isALink: boolean;
  isAButton: boolean;
  url: string;
}

export default interface IMessageData {
  createdAt: string;
  userId: string;
  _id: string;
  __v: number;
  conversation: [IMessageFromDb];
}
