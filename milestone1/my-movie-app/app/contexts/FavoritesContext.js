"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Creating the context
export const FavoritesContext = createContext();

// Provider component that will wrap around the app
export function FavoritesContextProvider({ children }) {
  // State to store favorites
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to add an item to the favorites list
  function addToFavorites(item) {
    // Check if the item already exists in the favorites
    if (favorites.some((fav) => fav.id === item.id)) {
      alert(`${item.title} is already in your favorites.`);
      return; // Prevent adding duplicate items
    }

    // Update the favorites array
    const updatedFavorites = [...favorites, item];
    setFavorites(updatedFavorites);

    // Store the updated favorites list in localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert(`${item.title} has been added to your favorites.`);
  }

  // Function to remove an item from the favorites list
  function removeFromFavorites(itemId) {
    // Filter out the item to remove
    const updatedFavorites = favorites.filter((item) => item.id !== itemId);
    setFavorites(updatedFavorites);

    // Update the localStorage with the new list
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert("Item removed from favorites.");
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to access the favorites context
export function useFavoritesContext() {
  return useContext(FavoritesContext);
}
