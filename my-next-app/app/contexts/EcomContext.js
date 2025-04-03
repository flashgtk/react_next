"use client";
import { createContext, useContext, useState } from "react";

export const EcomContext = createContext();

export function EcomContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);

  function addToCart(product) {
    setCart([...cart, product]);
    
  }

  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.id !== productId));
  }

  function addToFavourites(product) {
    setFavourites([...favourites, product]);
  }

  function removeFromFavourites(productId) {
    setFavourites(favourites.filter((item) => item.id !== productId));
  }

  return (
    <EcomContext.Provider value={{ cart, favourites, addToCart, removeFromCart, addToFavourites, removeFromFavourites }}>
      {children}
    </EcomContext.Provider>
  );
}

export function useEcomContext() {
  return useContext(EcomContext);
}
