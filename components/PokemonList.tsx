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
  
  if(isLoading || isFetching) {
    return (
      <div className="h-[40vh] flex justify-center items-center">
        <Loader/>
      </div>
    )
  }
  
  return (
    <div className={'px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
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
    </div>
  )
}
export default PokemonList
