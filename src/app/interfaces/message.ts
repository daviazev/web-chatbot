export default interface IMessage {
  text: string;
  createdAt: Date;
  chatBotText: boolean;
  isALink: boolean;
  link: string
}
