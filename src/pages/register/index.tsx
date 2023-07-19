"use client";
import React, { useState } from "react";
import api from "@/axios/config";
import styles from "./register.module.css";
import Navbar from "@/app/components/Navbar";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function UserRegistration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userAlreadyExists, setUserAlreadyExists] = useState(false);
  const [internalError, setInternalError] = useState(false);
  const [success, setSuccess] = useState(false)

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await api.post("api/register", { username, password });
      setSuccess(true)
    } catch (error) {
      console.log(error);
      if (
        (error as { response: { status: number } }).response?.status === 409
      ) {
        setUserAlreadyExists(true);
      } else {
        setInternalError(true);
      }
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className={`${styles.main} ${inter.className}`}>
      <div className={styles["resgiter-section"]}>
        <Navbar />
        <h2>User register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => handleUsernameChange(target.value)}
              placeholder="username"
              className={styles["register-input"]}
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => handlePasswordChange(target.value)}
              placeholder="password"
              className={styles["register-input"]}
            />
          </div>
          <button className={styles["register-btn"]} type="submit">
            Registrar
          </button>
        </form>
        {userAlreadyExists && <div>User already exists!</div>}
        {internalError && (
          <div>
            Sorry, a internal error has occurred! Roload the page and try again.{" "}
          </div>
        )}
        {success && (<div>successfully registered</div>)}
      </div>
    </div>
  );
}
