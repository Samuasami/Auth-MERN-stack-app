import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const validUser = await User.findOne({ email });

  if (validUser) return next(errorHandler(409, "User Already exist Found"));

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({
      error: false,
      success: true,
      messsage: "user created as successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User Not Found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler(401, "invalid credentials"));

    const tokenData = {
      _id: validUser._id,
      email: validUser.email,
    };

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 8,
    });

    res.cookie("token", token, tokenOption).status(200).json({
      message: "Login successfully!!",
      // data: token,
      // id:validUser._id,
      // success: true,
      // error: false,
    });

    // const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // const { password: hashPassword, ...rest } = validUser._doc;

    // const expireDate = new Date(Date.now() + 3600000);

    // res
    //   .cookie("access_token", token, { httpOnly: true, expires: expireDate })
    //   .status(200)
    //   .json(rest);
  } catch (err) {
    next(err);
  }
};
export const google = async (req, res, next) => {
  // Google auth
  try {
    const validUser = await User.findOne({ email: req.body.email });

    if (validUser) {
      const tokenData = {
        _id: validUser._id,
        email: validUser.email,
      };
  
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8,
      });
  
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully!!",
        data: token,
        id:validUser._id,
        success: true,
        error: false,
      });
  
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          (req.body.name || "user").split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilepicture: req.body.image,
      });

      await newUser.save();
      const tokenData = {
        _id: validUser._id,
        email: validUser.email,
      };
  
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8,
      });
  
      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully!!",
        data: token,
        id:validUser._id,
        success: true,
        error: false,
      });
  
    }
  } catch (error) {
    next(error);
  }
};


export const signout=(req,res)=>{
  res.clearCookie("token").status(200).json("signOut success");

}
