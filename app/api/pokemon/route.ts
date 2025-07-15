import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    
    const {userId, pokemonId, action} = await req.json();

    // validate the action
    if (!['bookmark', 'like'].includes(action)) {
      return NextResponse.json({message: "Invalid action"}, {status: 400})
    }
    
    // find or create a new user
    let user = await prisma.user.findUnique({
      where: {auth0Id: userId},
    });
    
    if(!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: userId,
          bookmarks: [],
          liked: [],
        }
      })
    }
    
    console.log('this is the before liking user: ', user)
    
    // determine the action to take
    const fieldToUpdate = action === 'bookmark' ? 'bookmarks' : 'liked'
    const currentItems = user[fieldToUpdate];
    
    // toggle logic
    let updatedItems;
    
    if (currentItems.includes(pokemonId)) {
      // remove the item if it exists
      updatedItems = currentItems.filter((item) => item !== pokemonId);
    } else {
      // add the item if it does not exist
      updatedItems = [...currentItems, pokemonId];
    }
    
    // update the user
    await prisma.user.update({
      where: { auth0Id: userId },
      data: {
        [fieldToUpdate]: updatedItems,
      },
    });
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
