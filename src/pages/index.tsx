import React from "react";
import HeaderUser from "@/pages/components/HeaderUser";
import PhotoOrder from "@/pages/components/PhotoOrder";
import Footer from "@/pages/components/Footer";

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-white`}
    >
      <HeaderUser/>
      <PhotoOrder/>
      <Footer/>
    </main>
  )
}
