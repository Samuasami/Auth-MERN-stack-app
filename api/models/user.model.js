import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
    profilepicture: {
      type: String,
      default:
        "https://www.istockphoto.com/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-gm1495088043-518213332?searchscope=image%2Cfilm",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
