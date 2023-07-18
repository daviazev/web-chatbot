import IMessage from "../interfaces/message";

const initialMessages = {
  NOT_LOGGED: "Hi, you are not logged in! Please enter your username.",
  NEED_PASSWORD: "We have your username. Now, we need your password.",
  WELCOME: "Great! You are all set up! Welcome!",
};

const nonUsernameMessage = {
  text: initialMessages.NOT_LOGGED,
  createdAt: new Date(),
  isAChatBotText: true,
  isALink: false,
  isAButton: false,
  url: "",
};

const welcomeMessage = {
  text: initialMessages.WELCOME,
  createdAt: new Date(),
  isAChatBotText: true,
  isALink: false,
  isAButton: false,
  url: "",
};

const nonUserIdMessage = {
  text: initialMessages.NEED_PASSWORD,
  createdAt: new Date(),
  isAChatBotText: true,
  isALink: false,
  isAButton: false,
  url: "",
};

const loanMessages: IMessage[] = [
  {
    text: "Sure! Please, choice one of these options:",
    createdAt: new Date(),
    isAChatBotText: true,
    isALink: false,
    isAButton: false,
    url: "",
  },
  {
    text: "I want to apply for a loan",
    createdAt: new Date(),
    isAChatBotText: true,
    isALink: false,
    isAButton: true,
    url: "",
  },
  {
    text: "Loan conditions",
    createdAt: new Date(),
    isAChatBotText: true,
    isALink: false,
    isAButton: true,
    url: "",
  },
  {
    text: "Help",
    createdAt: new Date(),
    isAChatBotText: true,
    isALink: false,
    isAButton: true,
    url: "",
  },
];

const loginErrorMessage: IMessage = {
  text: "Username or password is incorrect. Try again!",
  createdAt: new Date(),
  isAChatBotText: true,
  isALink: false,
  isAButton: false,
  url: "",
};

const goodByeMessage: IMessage = {
  text: "Goodbye! Have a nice day :)",
  createdAt: new Date(),
  isAChatBotText: true,
  isALink: false,
  isAButton: false,
  url: "",
};

export {
  nonUsernameMessage,
  nonUserIdMessage,
  welcomeMessage,
  loanMessages,
  loginErrorMessage,
  goodByeMessage,
};
