import IMessage from "../interfaces/message";

const initialMessages = {
  NOT_LOGGED: "Hi, you are not logged in! Please enter your username.",
  NEED_PASSWORD: "We have your username. Now, we need your password.",
  WELCOME: "Great! You are all set up! Welcome!",
};

const nonUsernameMessage = {
  text: initialMessages.NOT_LOGGED,
  createdAt: new Date(),
  chatBotText: true,
  isALink: false,
  isAButton: false,
  link: "",
};

const welcomeMessage = {
  text: initialMessages.WELCOME,
  createdAt: new Date(),
  chatBotText: true,
  isALink: false,
  isAButton: false,
  link: "",
};

const nonUserIdMessage = {
  text: initialMessages.NEED_PASSWORD,
  createdAt: new Date(),
  chatBotText: true,
  isALink: false,
  isAButton: false,

  link: "",
};

const loanMessages: IMessage[] = [
  {
    text: "Sure! Please, choice one of these options:",
    createdAt: new Date(),
    chatBotText: true,
    isALink: false,
    isAButton: false,
    link: "",
  },
  {
    text: "I want to apply for a loan",
    createdAt: new Date(),
    chatBotText: true,
    isALink: false,
    isAButton: true,
    link: "",
  },
  {
    text: "Loan conditions",
    createdAt: new Date(),
    chatBotText: true,
    isALink: false,
    isAButton: true,
    link: "",
  },
  {
    text: "Help",
    createdAt: new Date(),
    chatBotText: true,
    isALink: false,
    isAButton: true,
    link: "",
  },
];

export { nonUsernameMessage, nonUserIdMessage, welcomeMessage, loanMessages };