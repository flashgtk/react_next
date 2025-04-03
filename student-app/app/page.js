"use client";
import { useEffect, useState } from "react";
import { supabase } from "./lib/superbase";
import Link from "next/link";

export default function Home() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudentList();
  }, []);

  async function loadStudentList() {
    try {
      const { data, error } = await supabase.from("student").select("usn, name, age, email, phone, address, gender");
      if (error) throw error;
      setStudentList(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Student List</h1>
      <Link href="/students/create" className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">Add Student</Link>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {studentList.map((stud, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{stud.name}</h2>
            <p className="text-gray-600">USN: {stud.usn}</p>
            <p className="text-gray-600">Age: {stud.age}</p>
            <p className="text-gray-600">Email: {stud.email}</p>
            <p className="text-gray-600">Phone: {stud.phone}</p>
            <p className="text-gray-600">Address: {stud.address}</p>
            <p className="text-gray-600">Gender: {stud.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
