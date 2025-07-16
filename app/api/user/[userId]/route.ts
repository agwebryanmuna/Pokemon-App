import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dbConnect from "@/lib/connectDB";


export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }>}) {
  await  dbConnect();
  try {
    const {userId} = await params;
    
    if(!userId) {
      return NextResponse.json({message: `Invalid userId`}, {status: 400});
    }
    
    const user = await User.findOne({auth0Id: userId})
    
    if(!user) {
      return NextResponse.json({message: 'User not found'}, {status: 404})
    }
    
    return NextResponse.json(user)
  } catch (error) {
    console.log('Error in liking or bookmarking', error)
    return NextResponse.json({message: 'Error in liking or bookmarking'}, {status: 500})
  }
}
