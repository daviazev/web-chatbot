import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/backend/db";
import LoginController from "@/backend/controller/LoginController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(400).json({ message: "Wrong method" });
  }
  
  connectToDatabase();

  return new LoginController(req, res).loginControler();
}
