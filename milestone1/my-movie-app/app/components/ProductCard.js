"use client";

import { useFavoritesContext } from "@/app/contexts/FavoritesContext";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ id, image, title, desc, type }) {
  const { addToFavorites } = useFavoritesContext();
  const [isFavorite, setIsFavorite] = useState(false);

  // Handle adding item to favorites
  const handleAddToFavorites = () => {
    addToFavorites({ id, image, title, desc, type });
    setIsFavorite(true); // Mark the product as added to favorites
  };

  return (
    <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md">
      <Image
        src={image || "/images/default-placeholder.jpg"}
        alt={title}
        width={200}
        height={200}
        className="w-[200px] h-[200px] rounded-lg object-cover"
      />
      <h2 className="mt-2 font-semibold text-lg text-black">{title}</h2>
      <p className="text-sm text-gray-600">{desc}</p>

      {/* Type Badge */}
      <span className="mt-1 text-xs text-white bg-blue-500 px-2 py-1 rounded">
        {type === "movie" ? "Movie" : "Book"}
      </span>

      {/* Add to Favorites Button */}
      <button
        onClick={handleAddToFavorites}
        className={`mt-3 px-4 py-2 rounded-lg transition ${
          isFavorite
            ? "bg-green-500 cursor-not-allowed"
            : "bg-red-500 hover:bg-green-600"
        } text-white`}
        disabled={isFavorite} // Disable button after adding to favorites
      >
        {isFavorite ? "Added to Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
