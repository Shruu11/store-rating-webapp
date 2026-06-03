import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/profile",
  authenticateUser,
  (req, res) => {
    res.json({
      message: "Protected Route Accessed",
      user: req.user,
    });
  }
);

export default router;