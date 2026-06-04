import express from "express";
//import cors from "cors";
//import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js"
import testRouter from "./routes/test.routes.js"
import adminRouter from "./routes/admin.routes.js"
import ratingRouter from "./routes/rating.routes.js"
import storeRouter from "./routes/store.routes.js"
import storeOwnerRouter from "./routes/storeOwner.routes.js"
import {errorHandler} from "./middleware/error.middleware.js"
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser());

//app.use(
//  cors({
//    origin: "http://localhost:5173",
//    credentials: true,
//  })
//);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Store Rating API Running",
  });
});

app.use("/api/auth", authRouter);

app.use("/api/test", testRouter);

app.use("/api/admin", adminRouter);

app.use("/api/ratings",ratingRouter)

app.use("/api/stores", storeRouter)


app.use("/api/store-owner", storeOwnerRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

app.use(errorHandler);

export default app;