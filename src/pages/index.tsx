import React from "react";
import HeaderUser from "@/pages/components/HeaderUser";
import PhotoOrder from "@/pages/components/PhotoOrder";

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-white pb-40`}
    >
      <HeaderUser/>
      <PhotoOrder/>
    </main>
  )
}
