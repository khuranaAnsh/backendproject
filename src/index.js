// require("dotenv").config({ path: "./env" });  //this is breaking the consistency of code

import dotenv from "dotenv"; //this will not work until we config it

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});
connectDB();
// ! Below is first approach where we write the whole code in index.js file
/*
const app = express()(
  // ! Never ever connect database in one lin
  // ! Either use try catch or resolve reject because databse is always in another continent so it takes time to connect

  // ? We are using IIFE here Immediately Invoked Function Expression
  // Semicolon is used for cleaning purposes because before IIFE if compiler didn't add semicolon then it can create problem
  async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
      app.on("error", (error) => {
        console.log("ERROR:", error);
        throw error;
      });
      app.listen(process.env.PORT, () => {
        console.Consolelog(`App is listening on port 
            ${process.env.PORT}`);
      });
    } catch (error) {
      console.error("ERROR", error);
      throw error;
    }
  }
)();
*/
