"use client";
import { PersonStanding } from "lucide-react";
import React, { useState } from "react";
import InputField from "@/app/components/InputField";
import { supabase } from "@/app/lib/superbase";
import Link from "next/link";

export default function CreateStudent() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [usn, setUsn] = useState("");

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-black bg-gray-100">
            
            <h1 className="text-3xl font-bold text-blue-500 mb-4">Create Student</h1>
            <PersonStanding className="h-10 w-10 text-gray-600" />

            <InputField type="text" value={usn} placeholder="Student USN" onChange={(e) => setUsn(e.target.value)} />
            <InputField type="text" value={name} placeholder="Student Name" onChange={(e) => setName(e.target.value)} />
            <InputField type="number" value={age} placeholder="Student Age" onChange={(e) => setAge(e.target.value)} />
            <InputField type="email" value={email} placeholder="Student Email" onChange={(e) => setEmail(e.target.value)} />
            <InputField type="text" value={phone} placeholder="Student Phone No." onChange={(e) => setPhone(e.target.value)} />
            <InputField type="text" value={address} placeholder="Student Address" onChange={(e) => setAddress(e.target.value)} />
            <InputField type="text" value={gender} placeholder="Student Gender" onChange={(e) => setGender(e.target.value)} />

            <button
                onClick={async () => {
                    if (!usn || !name || !email || !phone || !address || !gender || !age) {
                        alert("All fields are mandatory");
                        return;
                    }
                    try {
                        const { data, error } = await supabase.from("student").insert([
                            {
                                usn:usn,
                                name:name,
                                age: Number(age),
                                email:email,
                                phone:Number(phone),
                                address:address,
                                gender:gender
                            },
                        ]).select()
                        if (error) {
                            throw error;
                        }

                        alert(`Student Profile Created \n ${JSON.stringify(data)}`);
                    } catch (e) {
                        alert(`Error:${JSON.stringify(e)}`);
                    }
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Submit
            </button>
        </div>
    );
}
