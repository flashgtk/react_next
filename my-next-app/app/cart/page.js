"use client";
import { useEcomContext } from "@/app/contexts/EcomContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart } = useEcomContext();

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <nav className="w-full bg-white shadow-md p-4 flex justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
         Back to Shopping
        </Link>
        <h1 className="text-2xl font-semibold text-black">Your Cart</h1>
      </nav>

      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center text-black">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <Image src={product.image} alt={product.title} width={60} height={60} className="rounded-lg object-cover" />
                  <div>
                    <h2 className="font-semibold text-black">{product.title}</h2>
                    <p className="text-sm text-gray-600">{product.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
