'use client'

import React from 'react'
import { useGlobalContext } from "@/context/globalContext";
import { useUser } from "@auth0/nextjs-auth0";
import PokemonCard from "@/components/PokemonCard";
import Loader from "@/components/Loader";
import { arrowAngleDown } from "@/utils/Icons";

const PokemonList = () => {
  const {isLoading} = useUser()
  const { isFetching, pokemonListDetails, loadMorePokemon } = useGlobalContext()
  
  if(isLoading || isFetching) return (<Loader/>)
  
  return (
    <>
      {!isFetching && pokemonListDetails && pokemonListDetails.length > 0 && pokemonListDetails.map((pokemon, index) => (
        <div key={index}>
          <PokemonCard pokemon={pokemon}/>
        </div>
      ))}
      {pokemonListDetails.length > 38 && (
        <div className={'mt-4 mb-10 flex items-center justify-center'}>
          <button onClick={() => loadMorePokemon()} className={'bg-[#6c5ce7]/15 text-[#6c5ce7] rounded-full py-4 px-8 font-bold flex gap-2 hover:bg-green-300 transition-all duration-300 ease-in-out'}>
            <span>{arrowAngleDown}</span>Load More
          </button>
        </div>
      )}
    </>
  )
}
export default PokemonList
