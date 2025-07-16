import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dbConnect from "@/lib/connectDB";

export async function POST(req: NextRequest) {
  await  dbConnect();
  
  try {
    const {userId, pokemonId, action} = await req.json();
    
    // validate the action
    if (!['bookmark', 'like'].includes(action)) {
      return NextResponse.json({message: "Invalid action"}, {status: 400})
    }
    
    // find or create a new user
    let user = await User.findOne({auth0Id: userId})
    
    if (!user) {
      user = new User({auth0Id: userId})
      await user.save()
    }
    
    console.log('this is the before liking user: ', user)
    
    // determine the action to take
    const fieldToUpdate = action === 'bookmark' ? 'bookmarks' : 'liked'
    const currentItems = user[fieldToUpdate];
    
    // toggle logic
    let updatedItems;
    
    if (currentItems.includes(pokemonId)) {
      // remove the item if it exists
      updatedItems = currentItems.filter((item:string) => item !== pokemonId);
    } else {
      // add the item if it does not exist
      updatedItems = [...currentItems, pokemonId];
    }
    
    user[fieldToUpdate] = updatedItems; // update the user object in memory
    await user.save()
    console.log('this is the after liking user: ', user)
    
    return NextResponse.json({
      toggledOff: currentItems.includes(pokemonId),
      success: true,
      message: `Successfully ${action}ed ${pokemonId}`,
    });
    
  } catch (error) {
    console.log('Error in liking or bookmarking pokemon:', error)
    
    return NextResponse.json({message: 'An error occurred while processing the request'}, {status: 500})
  }
}
