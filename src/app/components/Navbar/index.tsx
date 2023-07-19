import React from "react";
import styles from "./navbar.module.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  return (
    <div className={inter.className}>
      <nav className={styles.navbar}>
        <Link className={styles["navbar-item"]} href="/">
          Chatbot
        </Link>
        <Link className={styles["navbar-item"]} href="/historic">
          Histórico
        </Link>
        <Link className={styles["navbar-item"]} href="/register">
          Registre-se
        </Link>
      </nav>
    </div>
  );
}
