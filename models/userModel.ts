import mongoose, { Document, Model, Schema } from "mongoose";

interface IAvailability {
  day: string;
  time: string;
}

interface ISkill {
  name: string;
  category?: string;
  proficiency?: string;
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string;
  location?: string;
  profilePhoto?: string;
  skillsOffered: ISkill[];
  skillsWanted: ISkill[];
  availability: IAvailability[];
  isPublic: boolean;
  isVerified: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  refreshToken?: string;
  authProvider: "email" | "google";
  googleId?: string;
  rating?: number;
  swapCount?: number;
  isBanned?: boolean;
}

const skillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  proficiency: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "intermediate",
  },
});

const availabilitySchema = new Schema<IAvailability>({
  day: { 
    type: String, 
    required: true,
    enum: ['weekday', 'weekend'], // Only these two values allowed
    lowercase: true
  },
  time: { 
    type: String, 
    required: true,
    enum: ['morning', 'afternoon', 'evening'],
    lowercase: true
  }
});

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Name cannot be longer than 50 characters"],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: [100, "Email cannot be longer than 100 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      select: false,
      minlength: [8, "Password must be at least 8 characters"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot be longer than 100 characters"],
    },
    profilePhoto: {
      type: String,
      validate: {
        validator: (v: string) => {
          return v ? /^https?:\/\//.test(v) : true;
        },
        message: "Profile photo must be a valid URL",
      },
    },
    skillsOffered: {
      type: [skillSchema],
      validate: {
        validator: (v: ISkill[]) => v.length <= 10,
        message: "Cannot offer more than 10 skills",
      },
    },
    skillsWanted: {
      type: [skillSchema],
      validate: {
        validator: (v: ISkill[]) => v.length <= 10,
        message: "Cannot request more than 10 skills",
      },
    },
    availability: {
      type: [availabilitySchema],
      validate: {
        validator: (v: IAvailability[]) => v.length <= 7,
        message: "Cannot specify availability for more than 7 days",
      },
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      select: false,
    },
    verifyTokenExpiry: {
      type: Date,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
    authProvider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
    googleId: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    swapCount: {
      type: Number,
      default: 0,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.refreshToken;
        delete ret.verifyToken;
        delete ret.verifyTokenExpiry;
        return ret;
      },
    },
  }
);

// All indexes defined in one place
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });
userSchema.index({ isPublic: 1 });
userSchema.index({ "skillsOffered.name": 1 });
userSchema.index({ "skillsWanted.name": 1 });
userSchema.index({ location: "text" }); // Text index for location search

// Compound index for availability searches
userSchema.index({ "availability.day": 1, "availability.time": 1 });

// Add pre-save hook to normalize data
userSchema.pre("save", function (next) {
  if (this.googleId && !this.isVerified) {
    this.isVerified = true; // Auto-verify Google users
  }
  next();
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
