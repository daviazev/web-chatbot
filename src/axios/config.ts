import axios from "axios"

const api = axios.create({ baseURL: "https://web-chatbot.vercel.ap" });

export default api;
