export default interface IChat {
  _id?: string;
  userId?: string;
  conversation: [
    {
      text: string,
      createdAt: Date,
      chatBotText: boolean
    }
  ];
  createdAt: Date
}