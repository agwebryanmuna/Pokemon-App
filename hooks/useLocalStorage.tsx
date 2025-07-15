import { useEffect, useState } from 'react'
import { useUser } from "@auth0/nextjs-auth0";

const useLocalStorage = () => {
  const {user} = useUser()
  const [favorites, setFavorites] = useState<number[]>([])
  const [bookmarks, setBookmarks] = useState<number[]>([])
  
  const getFavorites = () => {
    const favoritesFromStorage = window.localStorage.getItem('favorites')
    setFavorites(favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [])
  }
  
  const setFavoritesToLocalStorage = (favorites: number[]) => {
    window.localStorage.setItem('favorites', JSON.stringify(favorites))
  }
  
  const getBookmarks = () => {
    const bookmarksFromStorage = window.localStorage.getItem('bookmarks')
    setBookmarks(bookmarksFromStorage ? JSON.parse(bookmarksFromStorage) : [])
  }
  
  const setBookmarksToLocalStorage = (bookmarks: number[]) => {
    window.localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  2.115.27
  
  return [favorites, bookmarks];
}


/*
* Check that user is logged in
* Only set or get from local storage if user is logged in
* check local storage to get bookmarks and likes
* get bookmarks if they exist
* get likes if they exist
* display them
* */
