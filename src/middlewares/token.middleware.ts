import { Request, Response, NextFunction } from "express";

import JWT from "../utils/jwt.class";

export interface ReqWithHeader extends Request {
  headers: {
    authorization?: string;
  };
}

const validateToken = (
  req: ReqWithHeader,
  _res: Response,
  next: NextFunction
) => {
  const { authorization = "" } = req.headers;

  const isValid = new JWT().validateToken(authorization);
  if (!isValid)
    next({
      status: 401,
      message: "Unauthorized, authentication token is required",
    });
  
  if (isValid.data.id !== req.body.id) {
    next({
      status: 401,
      message: "Unauthorized, authentication token is required",
    });
  }
  next();
};

export default validateToken;
