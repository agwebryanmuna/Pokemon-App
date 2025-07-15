import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({message: 'Liking or bookmarking successfull'})
  } catch (error) {
    console.log('Error in liking or bookmarking pokemon:', error)
    
    return NextResponse.json({message: 'An error occurred while processing the request'}, {status: 500})
  }
}
