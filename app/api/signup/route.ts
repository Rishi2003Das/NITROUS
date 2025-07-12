import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import connectMongo from "@/dbConnect/dbConnect";
import { OAuth2Client } from "google-auth-library";
import { generateTokens } from "@/helpers/getToken";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectMongo();
    const reqBody = await request.json();
    const {
      name,
      email,
      password,
      googleToken,
      location,
      profilePhoto, // This will now be the Cloudinary secure_url
      isPublic,
      skillsOffered = [],
      skillsWanted = [],
      availability = []
    } = reqBody;

    if (googleToken) {
      // Google OAuth flow
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload?.email_verified || !payload.email) {
        return NextResponse.json(
          { error: "Google account not verified or email missing" },
          { status: 401 }
        );
      }

      const googleEmail = payload.email.toLowerCase();
      const googleName = payload.name || googleEmail.split("@")[0];

      // Check for existing user
      const existingUser = await User.findOne({
        $or: [{ email: googleEmail }, { googleId: payload.sub }],
      });

      if (existingUser) {
        return NextResponse.json(
          {
            error: "User already exists",
            provider: existingUser.authProvider,
          },
          { status: 409 }
        );
      }

      // Create new Google user
      const newUser = new User({
        name: googleName,
        email: googleEmail,
        googleId: payload.sub,
        isVerified: payload.email_verified,
        authProvider: 'google',
        profilePhoto: payload.picture || profilePhoto || '',
        location: location || '',
        isPublic: isPublic !== false,
        skillsOffered: skillsOffered,
        skillsWanted: skillsWanted,
        availability: availability
      });

      const savedUser = await newUser.save();

      // Generate tokens
      const tokenPayload = {
        userId: savedUser._id.toString(),
        email: savedUser.email,
        name: savedUser.name,
      };

      const { accessToken, refreshToken } = generateTokens(tokenPayload);

      // Store refresh token
      savedUser.refreshToken = refreshToken;
      await savedUser.save();

      // Set response with refresh token cookie
      const response = NextResponse.json({
        success: true,
        message: "Google sign-up successful",
        accessToken,
        user: {
          id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
          isVerified: savedUser.isVerified,
          profilePhoto: savedUser.profilePhoto,
        },
      });

      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return response;
    } else {
      // Regular email/password flow
      if (!name || !email || !password) {
        return NextResponse.json(
          { error: "Name, email and password are required" },
          { status: 400 }
        );
      }

      if (password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters" },
          { status: 400 }
        );
      }

      const normalizedEmail = email.toLowerCase();
      const existingUser = await User.findOne({ email: normalizedEmail });

      if (existingUser) {
        return NextResponse.json(
          {
            error: "Email already in use",
            provider: existingUser.authProvider,
          },
          { status: 409 }
        );
      }

      const hashedPassword = await bcryptjs.hash(password, 12);

      const newUser = new User({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        isVerified: false,
        authProvider: "email",
        location: location || "",
        profilePhoto: profilePhoto || "",
        isPublic: isPublic !== false,
        skillsOffered: skillsOffered,
        skillsWanted: skillsWanted,
        availability: availability
      });

      const savedUser = await newUser.save();

      // Generate tokens
      const tokenPayload = {
        userId: savedUser._id.toString(),
        email: savedUser.email,
        name: savedUser.name,
      };

      const { accessToken, refreshToken } = generateTokens(tokenPayload);

      // Store refresh token
      savedUser.refreshToken = refreshToken;
      await savedUser.save();

      // Send verification email
      await sendEmail({
        email: savedUser.email,
        emailType: "VERIFY",
        userId: savedUser._id.toString(),
      });

      // Set response
      const response = NextResponse.json({
        success: true,
        message: "Registration successful. Please check your email.",
        accessToken,
        user: {
          id: savedUser._id,
          email: savedUser.email,
          name: savedUser.name,
          isVerified: savedUser.isVerified,
          profilePhoto: savedUser.profilePhoto,
        },
      });

      response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return response;
    }
  } catch (error: unknown) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      {
        error: "An error occurred during signup",
        details: error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}