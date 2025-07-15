import React from 'react';
import usePokemonData from "@/hooks/usePokemonData";
import { Pokemon } from "@/utils/definitions";


interface GlobalContextValue {
  isFetching: boolean,
  fetchPokemonData: () => void,
  pokemonListDetails: Pokemon[]
  fetchPokemonByName: (name:string) => void
  activePokemon: Pokemon | undefined,
  loadMorePokemon: () => void,
}

const GlobalContext = React.createContext<GlobalContextValue>({})

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {
  
  const {isFetching, fetchPokemonData, pokemonListDetails, fetchPokemonByName, activePokemon, loadMorePokemon} = usePokemonData()
  
  const value = {
    isFetching,
    fetchPokemonData,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    loadMorePokemon
  }
  
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
}
