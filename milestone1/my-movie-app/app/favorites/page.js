"use client";
import { useState } from "react";
import { useFavoritesContext } from "@/app/contexts/FavoritesContext"; // Make sure the path is correct
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavoritesContext(); // Get the favorites from context

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      {/* Navigation Bar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 hover:underline">
          Back to Home
        </Link>
        <h1 className="text-2xl font-semibold text-black">Your Favorites</h1>
      </nav>

      {/* Favorites Content */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        {favorites.length === 0 ? (
          <p className="text-gray-600 text-center text-black">Your favorites list is empty.</p>
        ) : (
          <div className="space-y-4">
            {favorites.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b">
                {/* Image & Details */}
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image || "/images/default-placeholder.jpg"} // Fallback image if no image exists
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-black text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                    <span className="text-xs text-white bg-blue-500 px-2 py-1 rounded">
                      {item.type === "movie" ? "Movie" : "Book"}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromFavorites(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
