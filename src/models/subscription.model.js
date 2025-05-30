import mongoose, { Schema } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apierror";
import { User } from "./user.model";
import { ApiResponse } from "../utils/ApiResponse";

export const subscriptionSchema = new Schema(
  {
    subsriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
