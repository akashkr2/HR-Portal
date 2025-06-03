import express from "express";
import authRouter from "./src/routers/authRouter.js";
import connectDB from "./src/config/db.js";
import cors from "cors";
import userRouter from "./src/routers/userRouter.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server Working" });
});

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

// app.use("/api/emp", empRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started at", port);
  connectDB();
});
