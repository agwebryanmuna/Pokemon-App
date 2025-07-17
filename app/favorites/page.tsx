'use client'

import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "@/context/globalContext";
import PokemonCard from "@/components/PokemonCard";
import { Pokemon } from "@/utils/definitions";
import Loader from "@/components/Loader";

const FavoritesPage = () => {
  
  const { fetchPokemonByName, userDetails } = useGlobalContext()
  const [likedPokemon, setLikedPokemon] = useState<Pokemon[]>([]);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(userDetails?.liked) {
      const fetchLikedPokemon = async () => {
        setLoading(true);
        const promises = userDetails.liked.map(pokemonName => fetchPokemonByName(pokemonName));
        const results = await Promise.all(promises);
        setLikedPokemon(results);
        setLoading(false);
      }
      fetchLikedPokemon();
    }
  },[userDetails?.liked])
  
  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Loader/>
      </div>
    );
  }
  
  return (
    <main>
      {!loading && (
        <section className="min-h-[91vh]">
          {likedPokemon.length > 0 ? (
            <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {likedPokemon.map((pokemon, index:number) => (
                <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl font-bold text-gray-800 mt-20">
              No liked pokemon
            </h2>
          )}
        </section>
      )}
    </main>
  )
}
export default FavoritesPage
