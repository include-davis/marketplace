import mongoose, { Schema, Types, Model } from "mongoose";

export interface GoogleProvider {
    sub: string;
    email?: String;
}

export interface UserDoc {
    _id: Types.ObjectId;
    email: String;
    
    passwordHash: string | null;
    google: GoogleProvider | null;
    
    isEmailVerified: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const googleSchema = new Schema<GoogleProvider>(
    {
        sub: { type: String, index: true },
        email: { type: String }
    },
    { _id: false }
);

const userSchema = new Schema<UserDoc>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // regex matching
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
    }, { timestamps: true,
});

/* create email indices starting from A in ascending order
userSchema.index({ email: 1 }, { unique: true });
*/

export const User: Model<UserDoc> = mongoose.models.User || mongoose.model<UserDoc>("User", userSchema);