"use client";
import { useRouter } from "next/navigation";
import { useEcomContext } from "../contexts/EcomContext";

export default function ProductCard({ id, image, title, desc }) {
  const { addToCart, addToFavourites } = useEcomContext();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md">
      <img src={image} alt={title} className="w-[200px] h-[200px] rounded-lg object-cover" />
      <h2 className="mt-2 font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600">{desc}</p>
      <button
        onClick={() => {
          addToCart({ id, image, title, desc });
          alert(`Added to cart: ${title}`);
          router.push("/cart");
        }}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Add to Cart
      </button>

      <button
        onClick={() => {
          addToFavourites({ id, image, title, desc });
          alert(`Added to favourites: ${title}`);
          router.push("/cart")
        }}
        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Favourite
      </button>
    </div>
  );
}
