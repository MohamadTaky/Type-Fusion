import { Router } from "express";
import { checkAuth, singin, signup, signout } from "./user.controller.js";

const userRouter = Router();

userRouter.get("/", checkAuth);
userRouter.post("/signin", singin);
userRouter.post("/signup", signup);
userRouter.post("/signout", signout);

export default userRouter;
