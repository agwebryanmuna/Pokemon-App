import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonList } from "@/utils/definitions";

const baseUrl = "https://pokeapi.co/api/v2/";

const usePokemonData = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [originalpokemonListDetails, setOriginalPokemonListDetails] = useState<Pokemon[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
  const [pokemonListDetails, setPokemonListDetails] = useState<Pokemon[]>([]);
  const [activePokemon, setActivePokemon] = useState<Pokemon | undefined>(undefined);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  
  
  const fetchPokemonData = async (page = 1) => {
    setIsFetching(true);
    try {
      const limit = 50;
      const offset = (page - 1) * limit; // Assuming 50 items per page
      const res = await axios.get(`${baseUrl}pokemon?offset=${offset}&limit=${limit}`);
      
      setPokemonList((prev)=>[...prev, ...res.data.results])
      setCurrentPage(page);
      return res.data.results;
    } catch (error) {
      console.error("Failed to fetch Pokemon data:", error);
    } finally {
      setIsFetching(false);
    }
  }
  
  // fetch all pokemon data on initial load
  const fetchPokemonDetails = async () => {
    setIsFetching(true)
    try {
      const details = await Promise.all(pokemonList.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return res.data;
      }))
      
      setPokemonListDetails(details)
      
      // Store the original details for future reference
      setOriginalPokemonListDetails(details);
      return details;
    } catch (error) {
      console.log("Failed to fetch all Pokemon details:", error);
    } finally {
      setIsFetching(false);
    }
  }
  
  // fetch Pokémon by name
  const fetchPokemonByName = async (name:string) => {
    setIsFetching(true);
    try {
      const res = await axios.get(`${baseUrl}pokemon/${name}`);
      
      setActivePokemon(res.data);
      return res.data
    } catch (error) {
      console.log('Error fetching pokemon data', error)
    } finally {
      setIsFetching(false);
    }
  }
  
  // load more pokemon
  const loadMorePokemon = async () => {
    fetchPokemonData(currentPage + 1)
  }
  
  useEffect(() => {
    fetchPokemonData()
    fetchPokemonDetails()
  }, []);
  
  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);
  // console.log(pokemonListDetails)
  return {isFetching, fetchPokemonData, pokemonListDetails, fetchPokemonByName, activePokemon, loadMorePokemon}
}
export default usePokemonData
