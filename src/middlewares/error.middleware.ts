import { ErrorRequestHandler } from "express";
import { ErrorHandler } from "../utils/Error.class";

const errorHandler: ErrorRequestHandler = (
  err: ErrorHandler,
  _req,
  res,
  _next
) => {
  console.log(err.message);

  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
};

export default errorHandler;
