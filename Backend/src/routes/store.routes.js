import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { getAllStores } from "../controllers/store.controller.js";

const router = express.Router();

router.get("/", authenticateUser, getAllStores);

export default router;