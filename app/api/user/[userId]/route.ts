import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest, {params}:{params: {userId: string}}) {
  try {
    const {userId} = params;
    
    if(!userId) {
      return NextResponse.json({message: `Invalid userId`}, {status: 400});
    }
    
    const user = await prisma.user.findUnique({where: {auth0Id: userId}})
    
    if(!user) {
      return NextResponse.json({message: 'User not found'}, {status: 404})
    }
    
    return NextResponse.json(user)
  } catch (error) {
    console.log('Error in liking or bookmarking', error)
    return NextResponse.json({message: 'Error in liking or bookmarking'}, {status: 500})
  }
}
