import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { updateRating, submitRating } from "../controllers/rating.controller.js";

const router = express.Router();

router.put("/:storeId", authenticateUser, updateRating);
router.post("/", authenticateUser, submitRating);

export default router;