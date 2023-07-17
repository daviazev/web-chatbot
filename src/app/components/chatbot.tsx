"use client";
import styles from "./chatbot.module.css";
import React, { useEffect, useState } from "react";
import {
  nonUsernameMessage,
  nonUserIdMessage,
  welcomeMessage,
  loanMessages,
  loginErrorMessage,
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

  useEffect(() => {
    localStorage.clear();
  }, []);

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
          console.log("deu erro", error);
          conversationsHandler(loginErrorMessage);
          localStorage.clear();
          setCall(0)
          setCall2(0)
        });

      setFirstCall(false);
    }
  }, [localStorage.getItem("username"), localStorage.getItem("userId")]);

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
      setUser((prev) => ({
        ...prev,
        username: text,
      }));
      credentialsListener();
      setisPassword(true);
    }
  };

  const handlerUserId = () => {
    if (call2 === 0) {
      conversationsHandler(nonUserIdMessage);
      setCall2((prev) => prev + 1);
    } else {
      localStorage.setItem("userId", "322342");
      credentialsListener();
      setUser((prev) => ({
        ...prev,
        password: text,
      }));
      setisPassword(false);
      setFirstCall(true)
    }
  };

  const handleDefault = () => {
    const newMessage: IMessage = {
      text,
      createdAt: new Date(),
      chatBotText: false,
      isALink: false,
      isAButton: false,
      link: "",
    };

    conversationsHandler(newMessage);
  };

  const loanHandler = () => {
    handleDefault();

    loanMessages.forEach((e) => {
      conversationsHandler(e);
    });
  };

  const credentialsListener = () => {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (!username) {
      handleDefault();
      handlerUsername();
    } else if (!userId) {
      handlerUserId();
    } else if (username && userId && text === "loan") {
      loanHandler();
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
              { text, createdAt, chatBotText, isALink, link, isAButton },
              index
            ) => (
              <Message
                key={index}
                text={text}
                createdAt={createdAt}
                chatBotText={chatBotText}
                isALink={isALink}
                link={link}
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
          className={styles["send-btn"]}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
