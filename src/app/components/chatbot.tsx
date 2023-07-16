"use client";
import styles from "./chatbot.module.css";
import React, { useState } from "react";

type Message = {
  text: string;
  createdAt: Date;
  chatBotText: boolean;
};

export default function ChatBot() {
  const [text, setText] = useState("");
  const [conversations, setConversations] = useState<Message[]>([]);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handlerMessage = (text: string): void => {
    setText(text);
  };

  const sendMessage = (): void => {
    const addMessage: Message = {
      text,
      createdAt: new Date(),
      chatBotText: false,
    };

    setConversations([...conversations, addMessage]);
  };

  return (
    <main className={styles.main}>
      <div className={styles["chat-wrapper"]}>
        {conversations.map(({ text, createdAt, chatBotText }) => (
          <div
            className={
              chatBotText ? styles["msg-to-left"] : styles["msg-to-right"]
            }
          >
            <div
              className={
                chatBotText ? styles["chatbot-msg"] : styles["user-msg"]
              }
            >
              <span>{text}</span>
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["message-field"]}>
        <input
          onChange={({ target }) => handlerMessage(target.value)}
          className={styles.input}
          placeholder="type something"
        ></input>
        <button onClick={() => sendMessage()} className={styles["send-btn"]}>
          SEND
        </button>
      </div>
    </main>
  );
}
