import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserModel from "../models/User.model";
import UserService from "../services/user.service";
import bodyValidator from "../middlewares/body.middleware";

import {
  loginSchema,
  registerSchema,
  scoreSchema,
} from "../schemas/user.schema";
import validateToken from "../middlewares/token.middleware";

const route = Router();

const user = new UserModel();
const userService = new UserService(user);
const userController = new UserController(userService);

route.post("/", bodyValidator(registerSchema), (req, res, next) =>
  userController.create(req, res, next)
);
route.post("/login", bodyValidator(loginSchema), (req, res, next) =>
  userController.login(req, res, next)
);
route.get("/:id", (req, res, next) => userController.findOne(req, res, next));
route.get("/", (req, res, next) => userController.findAll(req, res, next));
route.put(
  "/",
  (req, res, next) => validateToken(req, res, next),
  bodyValidator(scoreSchema),
  (req, res, next) => userController.updateScore(req, res, next)
);

export default route;
