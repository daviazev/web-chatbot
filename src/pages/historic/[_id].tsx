import React, { useEffect, useState } from "react";
import IMessageData from "@/app/interfaces/databaseMessages";
import { formatDate } from "@/app/utils/formatDate";
import Message from "@/app/components/Message";
import styles from "./historic.module.css";
import Navbar from "@/app/components/Navbar";

function MessagesPage() {
  const [conversations, setConversations] = useState<IMessageData[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { pathname } = window.location;
      const urlParts = pathname.split("/");
      const id = urlParts[urlParts.length - 1];

      const storage = localStorage.getItem("conversations");
      const parseStorage = storage ? JSON.parse(storage) : null;

      const filter = parseStorage.filter(({ _id }: IMessageData) => _id === id);
      setConversations(filter);
    }
  }, []);

  return (
    <div className={styles.teste}>
      <Navbar />
      {conversations.length > 0 &&
        conversations.map(({ createdAt, conversation, _id }) => (
          <div key={_id}>
            <h2>conversation user #{localStorage.getItem("username")}</h2>
            <h3>{formatDate(createdAt)}</h3>
            {conversation.map(({ _id, text, createdAt, isAChatBotText }, index) => (
              <div key={_id} className={styles["msgs-history"]}>
                <Message
                  key={index}
                  createdAt={new Date(createdAt)}
                  text={text}
                  isALink={false}
                  isAbutton={false}
                  chatBotText={isAChatBotText}
                  link=""
                />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default MessagesPage;
