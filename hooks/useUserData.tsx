import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { User } from "@/utils/definitions";


export const useUserData = () => {
  const { user } = useUser()
  const [userDetails, setUserDetails] = useState<User | null>(null);
  
  const fetchUserDetails = async () => {
    if(!user) return;
    
    try {
      const res = await axios.get(`/api/user/${user.sub}`)
      setUserDetails(res.data)
    } catch (error) {
      console.log('Error fetching user details', error)
    }
  }
  
  const performAction = async (userId:string, pokemonId:string, action:string) => {
    try {
      // optimistically update UI
      setUserDetails((prev) => {
        if(!prev) return prev; // if userDetails is not set, return it as is
        const updatedBookmarks =
          action === "bookmark"
            ? prev.bookmarks.includes(pokemonId) // Is it already bookmarked?
              ? prev.bookmarks.filter((p) => p !== pokemonId) // if yes then remove it
              : [...prev.bookmarks, pokemonId] // if no then add it
            : prev.bookmarks; // no change in bookmarks
        
        const updatedLikes =
          action === "like"
            ? prev.liked.includes(pokemonId) // Is it already liked?
              ? prev.liked.filter((p) => p !== pokemonId) // if yes then remove it
              : [...prev.liked, pokemonId] // if no then add it
            : prev.liked; // no change in likes
        
        return {
          ...prev,
          bookmarks: updatedBookmarks,
          liked: updatedLikes,
        };
      });
      
      await axios.post('/api/pokemon', {
        userId,
        pokemonId,
        action,
      })
    } catch (error) {
      console.log('Error performing action', error)
      // fetchUserDetails()
    }
  }
  
  return {performAction, userDetails, fetchUserDetails}
}
