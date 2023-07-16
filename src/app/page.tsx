import styles from './page.module.css'
import ChatBot from './components/chatbot'

export default function Home() {

  return (
    <main className={styles.main}>
     <ChatBot />
    </main>
  )
}
