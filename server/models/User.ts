import mongoose, { Schema, Types, Model } from 'mongoose';

export type GoogleProvider = {
  sub: string;
  email?: string;
}

export type User = {
  _id: Types.ObjectId;
  email: string;

  passwordHash: string | null;
  google: GoogleProvider | null;

  isEmailVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const googleSchema = new Schema<GoogleProvider>(
  {
    sub: { type: String, index: true },
    email: { type: String },
  },
  { _id: false },
);

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // regex matching
    },

    passwordHash: {
      type: String,
      default: null,
      select: false,
    },

    google: {
      type: googleSchema,
      default: null,
    },

    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

/* create email indices starting from A in ascending order
userSchema.index({ email: 1 }, { unique: true });
*/

<<<<<<< HEAD
export const User: Model<UserDoc> =
  mongoose.models.User || mongoose.model<UserDoc>('User', userSchema);
=======
export const UserDocument: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema);

>>>>>>> 148d6a345e5542ceb8164895eab438967d622906
