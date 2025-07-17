import React, { Dispatch, SetStateAction, useEffect } from 'react';
import usePokemonData from "@/hooks/usePokemonData";
import { Pokemon, User } from "@/utils/definitions";
import { useUserData } from "@/hooks/useUserData";
import { useUser } from "@auth0/nextjs-auth0";


interface GlobalContextValue {
  isFetching: boolean,
  fetchPokemonData: () => void,
  pokemonListDetails: Pokemon[]
  fetchPokemonByName: (name: string) => Promise<Pokemon>
  activePokemon: Pokemon | undefined,
  loadMorePokemon: () => void,
  performAction: (userId: string, pokemonId: string, action: string) => void,
  fetchUserDetails: () => void,
  userDetails: User | null;
  searchQuery: string;
  handleSearchChange: (value:string) => void;
  setSearchQuery:  Dispatch<SetStateAction<string>>,
  handleFilterChange: (key:string, value:string) => void,
  filters: Record<string, string>,
  clearFilters: () => void,
}

const GlobalContext = React.createContext<GlobalContextValue>({} as GlobalContextValue)

export const GlobalContextProvider = ({children}: { children: React.ReactNode }) => {
  
  const {user} = useUser()
  
  const {
    isFetching,
    fetchPokemonData,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    searchQuery,
    loadMorePokemon,
    handleSearchChange,
    setSearchQuery,
    handleFilterChange,
    filters,
    clearFilters,
  } = usePokemonData()
  const {performAction, fetchUserDetails, userDetails} = useUserData()
  
  const value = {
    isFetching,
    fetchPokemonData,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    loadMorePokemon,
    performAction,
    fetchUserDetails,
    userDetails,
    searchQuery,
    handleSearchChange,
    setSearchQuery,
    handleFilterChange,
    filters,
    clearFilters,
  }
  
  useEffect(() => {
    if (user) fetchUserDetails()
  }, [user]);
  
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
}
