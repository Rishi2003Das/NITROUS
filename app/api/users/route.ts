import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import connectMongo from '@/dbConnect/dbConnect';

export async function GET() {
  try {
    await connectMongo();
    
    // Get only public profiles with basic information
    const users = await User.find({ isPublic: true })
      .select('name email location profilePhoto rating swapCount skillsOffered skillsWanted availability')
      .lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}