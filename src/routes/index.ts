import { Router } from "express";

import user from "./user.route";

const route = Router();

route.use("/user", user);

export default route;
