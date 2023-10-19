import React from "react";
import HeaderUser from "@/pages/components/HeaderUser";
import PhotoOrder from "@/pages/components/PhotoOrder";

export default function Home() {
  return (
    <main
      className={`min-h-screen bg-white `}
    >
      <HeaderUser/>

      <div className="container mx-auto">
        <div className="text-secondary relative my-5 flex mx-auto sm:w-1/2 md:1/3 lg:1/4 justify-between steps-border">
          <div className="text-center flex flex-col">
            <span className="w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer bg-surface z-[1]">1</span>
             <p className="text-sm font-semibold mt-1">Add photos</p>
          </div>
          <div className="text-center flex flex-col">
            <span className="w-8 h-8 mx-auto flex items-center justify-center border-primary border-2 rounded-full cursor-pointer bg-surface z-[1]">2</span>
            <p className="text-sm font-semibold mt-1">Configure</p>
          </div>
          <div className="text-center flex flex-col">
            <span className="w-8 h-8 mx-auto flex items-center justify-center border-primary border-2 rounded-full cursor-pointer bg-surface z-[1]">3</span>
            <p className="text-sm font-semibold mt-1">Place order</p>
          </div>
        </div>
      </div>

      <PhotoOrder/>

    </main>
  )
}
