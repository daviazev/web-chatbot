import styles from "./page.module.css";
import ChatBot from "./components/chatbot";

export default function Home() {
  return (
    <main className={styles.main}>
      <nav>
        <a href="/register">Registre-se</a>
        <a href="/historic">Historico de conversas</a>
      </nav>
      <ChatBot />
    </main>
  );
}
