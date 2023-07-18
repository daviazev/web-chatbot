export default interface IMessage {
  text: string;
  createdAt: Date;
  isAChatBotText: boolean;
  isALink: boolean;
  isAButton: boolean;
  url: string;
}
