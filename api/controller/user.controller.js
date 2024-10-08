import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "Api is working",
  });
};


export const updateUser = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return next(errorHandler(401, "You can only update your account"));
  }
  try {
    // If password is provided, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update user details
    const upDatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilepicture: req.body.profilepicture,
        },
      },
      { new: true }
    );

    // Destructure the response to exclude password
    const { password, ...rest } = upDatedUser._doc;

    // Return updated user details
    res.status(200).json(rest);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const deleteUser= async(req,res,next)=>{
  if (req.user._id !== req.params.id) {
    return next(errorHandler(401, "You can only Delete your account"));
  }

  try{
     await User.findByIdAndDelete(req.params.id)
     res.status(200).json({message:"User deleted successfully"})
  }catch(error){
    next(error);

  }
}
