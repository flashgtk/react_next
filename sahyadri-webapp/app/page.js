"user client";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";
import Promotion from "@/components/Promotion";

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-2 mt-3">
      <Navbar />
      <Partners />
      <Promotion />
    </div>
  );
}
