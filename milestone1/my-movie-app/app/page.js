"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { useFavoritesContext } from "@/app/contexts/FavoritesContext";

export default function Page() {
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites } = useFavoritesContext();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      const [movieResponse, bookResponse] = await Promise.all([
        fetch("/api/items?type=movie"),
        fetch("/api/items?type=book"),
      ]);

      if (!movieResponse.ok || !bookResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const [movieData, bookData] = await Promise.all([
        movieResponse.json(),
        bookResponse.json(),
      ]);

      setMovies(movieData);
      setBooks(bookData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-300">
      <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={125} height={125} />
        </div>
        <div className="flex-grow mx-6 flex gap-2">
          <input
            className="w-full max-w-[400px] p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Search for movies or books"
            type="text"
          />
        </div>
        <div className="flex gap-2">
          <Link href="/favorites">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
              Favorites
            </button>
          </Link>
        </div>
      </nav>
      <div className="w-full flex justify-center mt-2">
        <Image src="/adbanner.avif" alt="Ad Banner" width={2000} height={400} className="w-full" />
      </div>
      {error && (
        <div className="w-full bg-red-500 text-white text-center py-2">
          Error: {error}
        </div>
      )}
      <div className="w-full bg-white py-6 mt-2">
        <h2 className="text-2xl font-semibold text-black px-4">Movies</h2>
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {loading ? (
            <p className="text-center text-gray-600 w-full">Loading Movies...</p>
          ) : movies.length > 0 ? (
            movies.map(item => (
              <div key={item.id} className="bg-gray-100 text-black p-4 shadow-md rounded-lg">
                <ProductCard
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  desc={`${item.desc}`}
                  type="movie"
                  addFav={() => addToFavorites(item)}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 w-full">No movies found.</p>
          )}
        </div>
      </div>
      <div className="w-full bg-white py-6 mt-2">
        <h2 className="text-2xl font-semibold text-black px-4">Books</h2>
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {loading ? (
            <p className="text-center text-gray-600 w-full">Loading Books...</p>
          ) : books.length > 0 ? (
            books.map(item => (
              <div key={item.id} className="bg-gray-100 text-black p-4 shadow-md rounded-lg">
                <ProductCard
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  desc={item.desc}
                  type="book"
                  addFav={() => addToFavorites(item)}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 w-full">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
