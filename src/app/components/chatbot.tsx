"use client";
import styles from "./chatbot.module.css";
import React, { useEffect, useState } from "react";
import {
  nonUsernameMessage,
  nonUserIdMessage,
  welcomeMessage,
} from "@/app/utils/chatbotMessages";
import IMessage from "@/app/interfaces/message";
import Message from "./Message";

export default function ChatBot() {
  const [text, setText] = useState("");
  const [conversations, setConversations] = useState<IMessage[]>([]);
  const [call, setCall] = useState(0);
  const [call2, setCal2] = useState(0);
  const [isPassword, setisPassword] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    const isUsernameDefined = localStorage.getItem("username");
    const isUserIdDefined = localStorage.getItem("userId");

    if (isUsernameDefined && isUserIdDefined) {
      setConversations((prevConversations) => [
        ...prevConversations,
        welcomeMessage,
      ]);
    }
  }, [localStorage.getItem("username"), localStorage.getItem("userId")]);

  const handlerMessage = (text: string) => {
    setText(text);
  };

  const conversationsHandler = (message: IMessage) => {
    setConversations((prevConversations) => [
      ...prevConversations,
      message,
    ]);
  }

  const handlerUsername = () => {
    if (call === 0) {
      conversationsHandler(nonUsernameMessage)
      setCall((prev) => prev + 1);
    } else {
      localStorage.setItem("username", text);
      credentialsListener();
      setisPassword(true);
    }
  };

  const handlerUserId = () => {
    if (call2 === 0) {
      conversationsHandler(nonUserIdMessage)
      setCal2((prev) => prev + 1);
    } else {
      localStorage.setItem("userId", "322342");
      setisPassword(false);
    }
  };

  const handleDefault = () => {
    const newMessage: IMessage = {
      text,
      createdAt: new Date(),
      chatBotText: false,
    };

    conversationsHandler(newMessage)
  };

  const credentialsListener = () => {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    if (!username) {
      handleDefault();
      handlerUsername();
    } else if (!userId) {
      handlerUserId();
    } else {
      handleDefault();
    }

    setText("");
  };

  return (
    <div className={styles.main}>
      <div className={styles["chat-wrapper"]}>
        {conversations.map(({ text, createdAt, chatBotText }, index) => (
          <Message
            key={index}
            text={text}
            createdAt={createdAt}
            chatBotText={chatBotText}
          />
        ))}
      </div>
      <div className={styles["message-field"]}>
        <input
          onChange={({ target }) => handlerMessage(target.value)}
          value={text}
          className={styles["input"]}
          type={isPassword ? "password" : "text"}
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
