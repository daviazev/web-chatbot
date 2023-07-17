"use client";
import React from "react";
import styles from "./message.module.css";
import formatDate from "@/app/utils/formatDate";
import IMessage from "@/app/interfaces/message";

export default function Message({
  chatBotText,
  text,
  createdAt,
}: IMessage) {
  return (
    <div
      className={chatBotText ? styles["msg-to-left"] : styles["msg-to-right"]}
    >
      <div className={chatBotText ? styles["chatbot-msg"] : styles["user-msg"]}>
        <span>{text}</span>
        <span className={styles["msg-time"]}>{formatDate(createdAt)}</span>
      </div>
    </div>
  );
}
