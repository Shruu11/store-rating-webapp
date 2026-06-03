import express from "express";
//import cors from "cors";
//import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js"
import testRouter from "./routes/test.routes.js"
import adminRouter from "./routes/admin.routes.js"
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

export default app;