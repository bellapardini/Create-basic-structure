import jwt from "jsonwebtoken";
import { ITokenData } from "../interfaces/IJwt";
require("dotenv").config();

class JWT {
  jwtConfig: any;
  jwtSecret: any;
  constructor() {
    this.jwtConfig = {
      expiresIn: "7d",
      algorithm: "HS256",
    };
    this.jwtSecret = process.env.JWT_SECRET;
  }

  generateToken(user: ITokenData) {
    const { jwtSecret, jwtConfig } = this;
    const token = jwt.sign({ data: user }, jwtSecret, jwtConfig);
    return token;
  }

  validateToken(token: string): any {
    const { jwtSecret } = this;
    const result = jwt.decode(token, jwtSecret) ;
    return result;
  }
}

export default JWT;
