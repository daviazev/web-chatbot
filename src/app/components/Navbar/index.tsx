import React from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div>
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
