import mongoose from "mongoose";

interface userDetails {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  stack: string;
}

interface user extends userDetails, mongoose.Document {}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your full name"],
  },
  email: {
    type: String,
    required: [true, "please enter your email "],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
  },
  stack: {
    type: String,
  },
});

const userModel = mongoose.model<user>("newAuth", userSchema);

export default userModel;
