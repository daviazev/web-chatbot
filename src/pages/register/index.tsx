"use client";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import api from "@/axios/config";

export default function UserRegistration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const { data } = await api.post("api/register", { username, password });

    console.log(data);

    // navigate("/");

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <nav>
        <a href="/">Chatbot</a>
        <a href="/historic">Registre-se</a>
      </nav>
      <h2>Registro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={({ target }) => handleUsernameChange(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
