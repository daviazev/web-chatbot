import React from "react";
import styles from "./navbar.module.css";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Navbar() {
  return (
    <div className={inter.className}>
      <nav className={styles.navbar}>
        <a className={styles["navbar-item"]} href="/">
          Chatbot
        </a>
        <a className={styles["navbar-item"]} href="/historic">
          Histórico
        </a>
        <a className={styles["navbar-item"]} href="/register">
          Registre-se
        </a>
      </nav>
    </div>
  );
}
