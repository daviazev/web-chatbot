import styles from "./page.module.css";
import ChatBot from "./components/chatbot";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Navbar />
        <ChatBot />
      </div>
    </main>
  );
}
