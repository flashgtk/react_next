"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const router= useRouter();
  function validateForm(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email.includes("@")) {
      setError("Enter a valid email address!");
      return;
    }

    if (password.length < 6 || password.length > 12) {
      setError("Password must be 6-12 characters long!");
      return;
    }

    setError("");
    alert("Login successful!");
    router.push('/')
  }

  return (
    <div className="p-4 bg-gray-300 min-h-screen">
      <nav className="flex items-center justify-between bg-white shadow-md p-2 rounded-lg">
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
          <Link href="/">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600 transition">
              Home
            </button>
          </Link>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Support
          </button>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-[80vh] p-2">
        <div className="bg-white p-6 rounded-lg shadow-lg min-h-[80vh] min-w-[80vh]">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 flex items-center justify-center bg-blue-500 rounded-full ">
              <Image src="/flogo.png" alt="Logo" width={50} height={50} />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mt-4 mb-4 text-black">Login</h2>
          <form onSubmit={validateForm}>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 text-black"
              placeholder="Password (6-12 chars)"
              minLength="6"
              maxLength="12"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <p className="text-center mt-4 text-sm text-black">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}