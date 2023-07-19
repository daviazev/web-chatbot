"use client";
import React from "react";
import styles from "./message.module.css";
import formatDateToString from "@/app/utils/formatDate";
import clsx from "clsx";
import { Inter } from "next/font/google";
import {
  goodByeMessage,
  helpMessage,
  loanConditionsMessage,
  applyForALoanMessage,
  jokeMessage,
  helpLoanLink,
  loanConditionsLink,
  wantALoanLink,
} from "@/app/utils/chatbotMessages";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
      loanChatBotMessges(helpMessage, false, "");
      loanChatBotMessges("Help with loan", true, helpLoanLink);
    } else if (text === "Loan Conditions") {
      loanChatBotMessges(loanConditionsMessage, false, "");
      loanChatBotMessges("About loan conditions", true, loanConditionsLink);
    } else if (text === "Yes") {
      loanChatBotMessges(jokeMessage, false, "");
      loanChatBotMessges(goodByeMessage.text, false, "");
    } else if (text === "No, I'm fine, thanks!") {
      loanChatBotMessges(goodByeMessage.text, false, "");
    } else {
      loanChatBotMessges(applyForALoanMessage, false, "");
      loanChatBotMessges("Take a loan", true, wantALoanLink);
    }
  };

  if (isAbutton) {
    return (
      <div className={styles["msg-to-left"]}>
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
          <Link href={link} target="_blank">
            {text}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        chatBotText ? styles["msg-to-left"] : styles["msg-to-right"]
      } ${inter.className}`}
    >
      <div className={chatBotText ? styles["chatbot-msg"] : styles["user-msg"]}>
        <span>{text}</span>
        <span className={styles["msg-time"]}>
          {formatDateToString(createdAt)}
        </span>
      </div>
    </div>
  );
}
