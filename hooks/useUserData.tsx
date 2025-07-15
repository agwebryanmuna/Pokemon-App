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
      await axios.post('/api/pokemon', {
        userId,
        pokemonId,
        action,
      })
    } catch (error) {
      console.log('Error performing action', error)
    }
  }
  
  return {performAction, userDetails, fetchUserDetails}
}
