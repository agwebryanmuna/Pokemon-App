'use client'

import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "@/context/globalContext";
import PokemonCard from "@/components/PokemonCard";
import { Pokemon } from "@/utils/definitions";
import Loader from "@/components/Loader";

const BookmarksPage = () => {
  
  const { fetchPokemonByName, userDetails } = useGlobalContext()
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState<Pokemon[]>([]);
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(userDetails?.bookmarks) {
      const fetchLikedPokemon = async () => {
        setLoading(true);
        const promises = userDetails.bookmarks.map(pokemonName => fetchPokemonByName(pokemonName));
        const results = await Promise.all(promises);
        setBookmarkedPokemon(results);
        setLoading(false);
      }
      fetchLikedPokemon();
    }
  },[userDetails?.bookmarks])
  
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
          {bookmarkedPokemon.length > 0 ? (
            <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bookmarkedPokemon.map((pokemon, index:number) => (
                <PokemonCard key={pokemon.name + index} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <h2 className="text-center text-2xl font-bold text-gray-800 mt-20">
              No bookmarked pokemon
            </h2>
          )}
        </section>
      )}
    </main>
  )
}
export default BookmarksPage
