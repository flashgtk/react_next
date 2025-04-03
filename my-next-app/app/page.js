"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
            placeholder="Search for products, brands, and more"
            type="text"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition">
            Search
          </button>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 transition">
            Home
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Support
          </button>
          <Link href="/login">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
              Login
            </button>
          </Link>
        </div>
      </nav>

      <div className="w-full flex justify-center mt-2">
        <Image src="/adbanner.webp" alt="Ad Banner" width={2000} height={400} className="w-full" />
      </div>

      <div className="w-full bg-white py-6 mt-2">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="bg-gray-100 text-black Sp-4 shadow-md rounded-lg">
                <ProductCard
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  desc={product.desc}
                  addCart={() => alert(`Added to cart: ${product.title}`)}
                  addFav={() => alert(`Added to favorites: ${product.title}`)}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 w-full">Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
}
