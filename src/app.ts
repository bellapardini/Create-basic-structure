import express, { Request, Response } from "express";
import errorHandler from "./middlewares/error.middleware";
import route from "./routes";
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ message: "ok" });
});

app.use(route);
app.use(errorHandler);

export default app;
