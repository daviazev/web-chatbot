import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/backend/db";
import ChatController from "@/backend/controller/ChatController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "GET") {
    return res.status(400).json({ message: "Wrong method" });
  }

  connectToDatabase();

  return new ChatController(req, res).getConversationsByUserId();
}
