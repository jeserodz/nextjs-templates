import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { initializeAuth, authenticate, setSessionCookie, generateToken } from "../../utils/auth";

const handler = nc<NextApiRequest & { user: any }, NextApiResponse>({ attachParams: true });

handler.use(initializeAuth());

handler.get("/api/ping", (req, res) => {
  res.send("pong");
});

handler.post("/api/auth/login", authenticate("local"), (req, res) => {
  const token = generateToken(req.user);
  setSessionCookie(req, res, token);
  res.json({ user: req.user, token });
});

handler.get("/api/auth/session", authenticate("jwt"), (req, res) => {
  res.json({ user: req.user });
});

export default handler;
