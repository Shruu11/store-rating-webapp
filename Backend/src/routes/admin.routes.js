import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  getDashboard,
  createUser,
  getUsers,
   getUserDetails
} from "../controllers/admin.controller.js";

import {
 
  createStore,
  getStores,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.use(authenticateUser);
adminRouter.use(authorizeRoles("ADMIN"));

adminRouter.get("/dashboard", getDashboard);
adminRouter.post("/users", createUser);
adminRouter.get("/users", getUsers);
adminRouter.get(
  "/users/:id",
  getUserDetails
);
adminRouter.post("/stores", createStore);

adminRouter.get("/stores", getStores);
export default adminRouter;

