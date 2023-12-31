"use client";
import styles from "./chatbot.module.css";
import React, { useEffect, useState } from "react";
import {
  nonUsernameMessage,
  nonUserIdMessage,
  welcomeMessage,
  loanMessages,
  loginErrorMessage,
  goodByeMessage,
  goodByeMessages,
  youAreWelcomeMessage,
} from "@/app/utils/chatbotMessages";
import IMessage from "@/app/interfaces/message";
import Message from "./Message";
import api from "@/axios/config";

export default function ChatBot() {
  const [text, setText] = useState("");
  const [conversations, setConversations] = useState<IMessage[]>([]);
  const [call, setCall] = useState(0);
  const [call2, setCall2] = useState(0);
  const [isPassword, setisPassword] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [firstCall, setFirstCall] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    if (text.length > 0) setIsButtonDisabled(false)
    else setIsButtonDisabled(true)
  }, [text])

  useEffect(() => {
    const finishConversation = async () => {
      if (
        conversations.length > 0 &&
        conversations[conversations.length - 1].text === goodByeMessage.text
      ) {
        await api.post("api/chat", {
          userId: localStorage.getItem("userId"),
          conversation: conversations,
        });
      }
    };

    finishConversation();
  }, [conversations]);

  useEffect(() => {
    const isUsernameDefined = localStorage.getItem("username");
    const isUserIdDefined = localStorage.getItem("userId");

    const handleLogin = async () => {
      const { data } = await api.post("api/login", { ...user });
      return data;
    };

    if (isUsernameDefined && isUserIdDefined && firstCall) {
      handleLogin()
        .then((response) => {
          localStorage.setItem("userId", response._id);
          localStorage.setItem("username", response.username);
          conversationsHandler(welcomeMessage);
        })
        .catch((error) => {
          conversationsHandler(loginErrorMessage);
          localStorage.clear();
          setCall(0);
          setCall2(0);
        });

      setFirstCall(false);
    }
  }, [user]);

  const handlerMessage = (text: string) => {
    setText(text);
  };

  const conversationsHandler = (message: IMessage) => {
    setConversations((prevConversations) => [...prevConversations, message]);
  };

  const handlerUsername = () => {
    if (call === 0) {
      conversationsHandler(nonUsernameMessage);
      setCall((prev) => prev + 1);
    } else {
      localStorage.setItem("username", text);
      setUser((prev) => ({ ...prev, username: text }));
      credentialsListener();
      setisPassword(true);
    }
  };

  const handlerUserId = () => {
    if (call2 === 0) {
      conversationsHandler(nonUserIdMessage);
      setCall2((prev) => prev + 1);
    } else {
      localStorage.setItem("userId", "1");
      setUser((prev) => ({ ...prev, password: text }));

      const messageWithoutPassword = {
        text: text.replace(/./g, "*"),
        createdAt: new Date(),
        isAChatBotText: false,
        isALink: false,
        isAButton: false,
        url: "",
      };

      conversationsHandler(messageWithoutPassword);
      setisPassword(false);
      setFirstCall(true);
    }
  };

  const handleDefault = () => {
    const newMessage: IMessage = {
      text,
      createdAt: new Date(),
      isAChatBotText: false,
      isALink: false,
      isAButton: false,
      url: "",
    };

    conversationsHandler(newMessage);
  };

  const loanHandler = () => {
    handleDefault();
    loanMessages.forEach((e) => conversationsHandler(e));
  };

  const credentialsListener = () => {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    const loan = text.toLocaleLowerCase().includes("loan");
    const goodbye = text.toLocaleLowerCase().includes("goodbye");
    const thanks = text.toLocaleLowerCase().includes("thanks");

    if (!username) {
      handleDefault();
      handlerUsername();
    } else if (!userId) {
      handlerUserId();
    } else if (username && userId && loan) {
      loanHandler();
    } else if (username && userId && goodbye) {
      handleDefault();
      goodByeMessages.forEach((msg) => {
        conversationsHandler(msg);
      });
    } else if (thanks) {
      handleDefault();
      conversationsHandler(youAreWelcomeMessage);
    } else {
      handleDefault();
    }

    setText("");
  };

  return (
    <div className={styles.main}>
      <div className={styles["chat-wrapper"]}>
        {conversations.length > 0 ? (
          conversations.map(
            (
              { text, createdAt, isAChatBotText, isALink, url, isAButton },
              index
            ) => (
              <Message
                key={index}
                text={text}
                createdAt={createdAt}
                chatBotText={isAChatBotText}
                isALink={isALink}
                link={url}
                conversationsHandler={conversationsHandler}
                isAbutton={isAButton}
              />
            )
          )
        ) : (
          <h2>Hi, type something!</h2>
        )}
      </div>
      <div className={styles["message-field"]}>
        <input
          onChange={({ target }) => handlerMessage(target.value)}
          value={text}
          className={styles["input"]}
          type={isPassword ? "password" : "text"}
          placeholder="Aa"
        />
        <button
          onClick={() => credentialsListener()}
          className={
            isButtonDisabled ? styles["disabled-button"] : styles["send-btn"]
          }
          disabled={isButtonDisabled}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
