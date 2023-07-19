"use client";
import api from "@/axios/config";
import { useEffect, useState } from "react";
import styles from "./historic.module.css";
import { formatDate } from "@/app/utils/formatDate";
import IMessageData from "@/app/interfaces/databaseMessages";
import Navbar from "@/app/components/Navbar";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Historic() {
  const [conversations, setConversations] = useState<IMessageData[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const getHistoric = async () => {
      const { data } = await api.get(`api/${userId}`);
      setConversations(data.response);
      localStorage.setItem("conversations", JSON.stringify(data.response));
    };

    getHistoric();
  }, []);

  return (
    <div className={`${styles.main} ${inter.className}`}>
      <Navbar />
      <h1>Histórico de conversas</h1>
      <div className={styles["chat-wrapper"]}>
        {conversations.length > 0 &&
          conversations.map(({ createdAt, _id }) => (
            <div className={styles["historic-links-wrapper"]}>
              <Link
              key={_id}
                className={styles["historic-link"]}
                href={`historic/${_id}`}
              >
                conversation user #{localStorage.getItem("username")} -{" "}
                {formatDate(createdAt)}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
