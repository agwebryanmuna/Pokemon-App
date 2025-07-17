import { useEffect, useState } from "react";
import axios from "axios";
import { Pokemon, PokemonList } from "@/utils/definitions";

const baseUrl = "https://pokeapi.co/api/v2/";

const usePokemonData = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [originalPokemonListDetails, setOriginalPokemonListDetails] = useState<Pokemon[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
  const [pokemonListDetails, setPokemonListDetails] = useState<Pokemon[]>([]);
  const [allPokemon, setAllPokemon] = useState<{
    name: string;
    url: string;
  }[]>([]);
  const [activePokemon, setActivePokemon] = useState<Pokemon | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const [filters, setFilters] = useState({
    type: "",
    ability: "",
    weight: "",
    height: "",
    sortOrder: "",
  });
  
  // fetch all Pokémon
  const fetchAllPokemon = async () => {
    try {
      const res = await axios.get(`${baseUrl}/pokemon?limit=1118`);
      setAllPokemon(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const fetchPokemonData = async (page = 1) => {
    setIsFetching(true);
    try {
      const limit = 50;
      const offset = (page - 1) * limit; // Assuming 50 items per page
      const res = await axios.get(`${baseUrl}pokemon?offset=${offset}&limit=${limit}`);
      
      setPokemonList((prev) => [...prev, ...res.data.results])
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
  const fetchPokemonByName = async (name: string): Promise<Pokemon> => {
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
    return {} as Pokemon;
  }
  
  // search Pokémon
  const searchPokemon = async ( query:string ) => {
    if (!query) {
      setSearchQuery("");
      
      const details = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          
          return res.data;
        })
      );
      
      setPokemonListDetails(details);
      return;
    }
    
    setIsFetching(true);
    
    const filteredPokemon = allPokemon.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(query.toLowerCase());
    });
    
    try {
      // fetch details for the filtered Pokémon
      const filtered = await Promise.all(
        filteredPokemon.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      
      setIsFetching(false);
      
      setPokemonListDetails(filtered);
    } catch (error) {
      console.error("Error searching pokemon", error);
    }
  };
  
  //filter pokemon
  const filterPokemon = () => {
    const { type, ability, weight, height, sortOrder } = filters;
    const query = searchQuery.toLowerCase();
    
    let filteredPokemon = originalPokemonListDetails;
    
    //apply the type filter
    if (type) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.types.some((t) => t.type.name === type);
      });
    }
    
    //apply the ability filter
    if (ability) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.abilities?.some((a) => a.ability.name === ability);
      });
    }
    
    //apply the weight filter
    if (weight) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.weight >= parseInt(weight);
      });
    }
    
    //apply the height filter
    if (height) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.height >= parseInt(height);
      });
    }
    
    //apply the search query
    if (query) {
      filteredPokemon = filteredPokemon.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(query);
      });
    }
    
    // apply sorting if sortOrder is provided
    if (sortOrder) {
      filteredPokemon =
        sortOrder === "asc"
          ? [...filteredPokemon].sort((a, b) => {
            return a.name.localeCompare(b.name, undefined, {
              sensitivity: "base",
            });
          })
          : [...filteredPokemon].sort((a, b) => {
            return b.name.localeCompare(a.name, undefined, {
              sensitivity: "base",
            });
          });
    }
    
    setPokemonListDetails(filteredPokemon);
  };
  
  // load more pokemon
  const loadMorePokemon = async () => {
    fetchPokemonData(currentPage + 1)
  }
  
  // handle change for filters
  const handleFilterChange = (key:string, value:string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const clearFilters = () => {
    setFilters({
      type: "",
      ability: "",
      weight: "",
      height: "",
      sortOrder: "",
    });
    setSearchQuery("");
    setPokemonListDetails(originalPokemonListDetails);
  };
  
  // handle change for search
  const handleSearchChange = (value:string) => {
    setFilters((prev) => ({ ...prev, query: value }));
    filterPokemon();
    searchPokemon(value);
  };
  
  useEffect(() => {
    fetchPokemonData()
    fetchAllPokemon();
  }, []);
  
  useEffect(() => {
    if (pokemonList.length > 0) {
      fetchPokemonDetails();
    }
  }, [pokemonList]);
  
  useEffect(() => {
    filterPokemon();
  }, [filters, searchQuery]);
  
  
  return {
    isFetching,
    fetchPokemonData,
    pokemonListDetails,
    fetchPokemonByName,
    activePokemon,
    loadMorePokemon,
    searchQuery,
    handleSearchChange,
    handleFilterChange,
    filters,
    clearFilters,
    setSearchQuery,
  }
}
export default usePokemonData
