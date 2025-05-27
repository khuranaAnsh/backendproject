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

// routes import

import userRouter from "./routes/user.routes.js";

// routes declaration

// is project me hum router ko alag nikal kr likh rhe hai, is file me nhi likha hai
// to router ko lane ke liye ab middleware lana pdega

// good practice is that if we define our api then we have to tell that we are defining our api
// and uska version kya hai, its a standard practice
app.use("/api/v1/users", userRouter); //koi bhi user agar /usrs pr jayega to control userRouter pr chla jayega
export { app };
