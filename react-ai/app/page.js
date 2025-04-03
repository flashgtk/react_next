"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <p className="font-bold text-2xl">Welcome to Jarvis</p>
      <p className="font-medium text-lg mt-2">
        Your personal AI assistant for Japanese learning and art generation
      </p>
      <button
        className="bg-red-600 px-6 py-3 rounded-full text-white mt-6 hover:bg-red-700 transition"
        onClick={() => router.push("/chat")}
      >
        Get Started
      </button>
    </div>
  );
}
