import { Router } from "express";
import { getUserData, addNewTest } from "./test.controller.js";
import requireAuth from "../../common/middleware/requireAuth.middleware.js";

const router = Router();
router.use(requireAuth);
router.get("/", getUserData);
router.post("/", addNewTest);

export default router;
