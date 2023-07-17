const initialMessages = {
  NOT_LOGGED: "Hi, you are not logged in! Please enter your username.",
  NEED_PASSWORD: "We have your username. Now, we need your password.",
  WELCOME: "Great! You are all set up! Welcome!",
};

const nonUsernameMessage = {
  text: initialMessages.NOT_LOGGED,
  createdAt: new Date(),
  chatBotText: true,
};

const welcomeMessage = {
  text: initialMessages.WELCOME,
  createdAt: new Date(),
  chatBotText: true,
};

const nonUserIdMessage = {
  text: initialMessages.NEED_PASSWORD,
  createdAt: new Date(),
  chatBotText: true,
};

export { nonUsernameMessage, nonUserIdMessage, welcomeMessage };
