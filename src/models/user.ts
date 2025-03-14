import mongoose, { Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    maxlength: 30,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const userModel = mongoose.model<User>("user", userSchema);

export default userModel;