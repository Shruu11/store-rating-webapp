import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { getDashboard,  getStoreRatings} from "../controllers/storeOwner.controller.js";

const storeOwnerRouter = express.Router();

storeOwnerRouter.get(
  "/dashboard",
  authenticateUser,
  authorizeRoles("STORE_OWNER"),
  getDashboard
);

storeOwnerRouter.get(
  "/ratings",
  authenticateUser,
  authorizeRoles("STORE_OWNER"),
  getStoreRatings
);

export default storeOwnerRouter;