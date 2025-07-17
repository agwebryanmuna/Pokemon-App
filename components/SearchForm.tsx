'use client'

import React from 'react'
import { search } from "@/utils/Icons";
import { useGlobalContext } from "@/context/globalContext";
import { useDebounce } from "react-use";

const SearchForm = () => {
  const { searchQuery, handleSearchChange, setSearchQuery } = useGlobalContext();
  useDebounce(() => {
    handleSearchChange(searchQuery)
  }, 1000, [searchQuery]);
  
  return (
    <form className="relative w-[80%] md:w-[50%] mx-auto shadow-md mt-5">
      <input
        type="text"
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        placeholder="Search Pokemon!"
        className="u-shadow-1 w-full py-5 px-6 rounded-xl text-lg outline-none text-gray-800"
      />
      <span className="absolute right-6 text-3xl top-[50%] translate-y-[-50%] text-gray-300 pointer-events-none">
        {search}
      </span>
    </form>
  )
}
export default SearchForm
