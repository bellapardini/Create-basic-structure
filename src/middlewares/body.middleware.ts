import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const bodyValidator =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) next({ status: 409, message: error.message });
    next();
  };

export default bodyValidator;
