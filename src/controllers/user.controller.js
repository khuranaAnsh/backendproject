import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrror } from "../utils/apierror.js";
import { user, User } from "../models/user.model.js";
import { uploadOnCLoudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({
  //     message: "hi ansh",
  //   });

  //   Steps
  // get user details from frontend
  // validation - not empty
  // check if user already exists: through username and email both
  // check for images , check for avatar
  // upload them to cloudinary, avatar
  // create user object- create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);

  //   if (fullName === "") {
  //     throw new ApiErrror(400, "fullname is required");
  //   }

  if (
    [fullName, email, username, password].some((field) => filed?.trim() === "")
  ) {
    throw new ApiErrror(400, "All fields are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiErrror(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path; //local path isliye because ye abhi server pr hai cloudinary pr nhi gya hai
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErrror(400, "Avatar file is required");
  }

  const avatar = await uploadOnCLoudinary(avatarLocalPath);
  const coverImage = await uploadOnCLoudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiErrror(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiErrror(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
