export default interface IMessage {
  text: string;
  createdAt: Date;
  chatBotText: boolean;
  isALink: boolean;
  isAButton: boolean;
  link: string;
}
