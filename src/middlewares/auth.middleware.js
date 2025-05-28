import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apierror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
// middleware khta hai jb bhi jana milke jana ek baar

// jb bhi hum middleware likhte hai to 4 parameteres aate hai
// next ka kaam tb hota hai jb is middleware ka kaam ho jaye khatam ab jha bhi isko aage leke jana hai le jao
//agle middleware me leke jana hai ya response me le kr jana hai
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
