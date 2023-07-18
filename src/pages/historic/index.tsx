"use client";
import Message from "@/app/components/Message";
import api from "@/axios/config";
import { useEffect, useState } from "react";

interface IMessage {
  _id: string;
  text: string;
  createdAt: string;
  isAChatBotText: boolean;
  isALink: boolean;
  isAButton: boolean;
  url: string;
}

interface IMessagesFromDB {
  createdAt: string;
  userId: string;
  _id: string;
  __v: number;
  conversation: [IMessage];
}

export default function Historic() {
  const [conversations, setConversations] = useState<IMessagesFromDB[]>([]);

  function formatarData(data: string): string {
    const dataObj = new Date(data);
    const dia = padZero(dataObj.getDate());
    const mes = padZero(dataObj.getMonth() + 1); // Os meses em JavaScript são baseados em zero
    const ano = dataObj.getFullYear();
    const hora = padZero(dataObj.getHours());
    const minutos = padZero(dataObj.getMinutes());

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

  function padZero(numero: number): string {
    return numero.toString().padStart(2, "0");
  }

  console.log("--->", conversations);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const getHistoric = async () => {
      const { data } = await api.get(`api/${userId}`);
      console.log(data);
      setConversations(data.response);
    };

    getHistoric();
  }, []);

  const conversationsHandler = () => {};

  return (
    <div>
      <nav>
        <a href="/">Chatbot</a>
        <a href="/historic">Registre-se</a>
      </nav>
      <h1>Histórico de conversas</h1>
      <div>
        {conversations.length > 0 &&
          conversations.map(({ createdAt, conversation }) => (
            <div>
              <h2>
                conversation user #{localStorage.getItem("username")} -{" "}
                {formatarData(createdAt)}
              </h2>
              {conversation.map(
                ({
                  text,
                  createdAt,
                  isAChatBotText,
                  isALink,
                  isAButton,
                  url,
                  _id,
                }) => (
                  <div key={_id}>
                    <span>{text}</span>
                    <span>{formatarData(createdAt)}</span>
                    <span>{isAChatBotText}</span>
                  </div>
                )
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
