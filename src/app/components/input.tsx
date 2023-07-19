"use client";
import React, { useEffect, useState } from "react";
import styles from "./chatbot.module.css";

type inputInfos = {
  handlerMessage: Function;
  value: string;
  username: boolean;
  userId: boolean;
};

export default function Input({
  handlerMessage,
  value,
  username,
  userId,
}: inputInfos) {

  const handler = (text: string) => {
    if (!username) {
        
    }
  }

  return (
    <>
      <input
        onChange={({ target }) => handler(target.value)}
        value={value}
        className={styles["input"]}
        placeholder="Aa"
      />
    </>
  );
}
