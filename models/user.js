import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// The code isn’t running on a typical Express.js backend server that’s always running
// Due to Next.js serverless architecture, this code will be executed everytime when a connection is established so we want to check if the models object already stores our User model
// Otherwise Mongoose will throw an error about redeclaring the model

const User = models.User || model("User", UserSchema);
export default User;
