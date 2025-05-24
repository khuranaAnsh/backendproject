import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ! app.use hum tb use karte hai jb hume koi middleware ya configuration settings krni hoti hai
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// app.use se hum express ko bta rhe hai ki kha se data ayega or usko kaise handle krna hai
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "!6kb" }));
app.use(express.static("public"));
app.use(cookieParser());
export { app };
