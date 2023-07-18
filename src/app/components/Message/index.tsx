"use client";
import React from "react";
import styles from "./message.module.css";
import formatDate from "@/app/utils/formatDate";
import clsx from "clsx";

const message1 =
  "I'm glad to help you! You can read more informations about how to make a loan on the link below";
const message2 =
  "I'm glad to help you! You can read more informations about loan conditions on the link below";
const message3 =
  "I'm glad to help you! You can read more informations about how to apply for a loan on the link below";

interface IMessageProps {
  text: string;
  createdAt: Date;
  chatBotText: boolean;
  isALink: boolean;
  link: string;
  isAbutton: boolean;
  conversationsHandler?: Function;
}

export default function Message({
  chatBotText,
  text,
  createdAt,
  isALink,
  isAbutton,
  link,
  conversationsHandler,
}: IMessageProps) {
  const loanChatBotMessges = (
    message: string,
    toggle: boolean,
    optionLink: string
  ) => {
    if (conversationsHandler) {
      conversationsHandler({
        text: message,
        createdAt: new Date(),
        isAChatBotText: true,
        isALink: toggle,
        url: optionLink,
      });
    }
  };

  const loanOptionsHandler = () => {
    if (conversationsHandler) {
      conversationsHandler({
        text,
        createdAt: new Date(),
        isAChatBotText: false,
        isALink: false,
        url: "",
      });
    }

    if (text === "Help") {
      loanChatBotMessges(message1, false, "");
      loanChatBotMessges("How to make a loan", true, "google.com");
    } else if (text === "Loan Conditions") {
      loanChatBotMessges(message2, false, "");
      loanChatBotMessges("How to make a loan", true, "google.com");
    } else {
      loanChatBotMessges(message3, false, "");
      loanChatBotMessges("How to make a loan", true, "google.com");
    }
  };

  if (isAbutton) {
    return (
      <div className={clsx(isALink && styles["msg-to-left"])}>
        <div>
          <button
            className={styles["btn-option"]}
            onClick={() => loanOptionsHandler()}
          >
            {text}
          </button>
        </div>
      </div>
    );
  }

  if (isALink) {
    return (
      <div className={clsx(isALink && styles["msg-to-left"])}>
        <div className={clsx(chatBotText && styles["chatbot-msg"])}>
          <a href={link} target="_blank">
            {text}
          </a>
        </div>
      </div>
    );
  }

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
