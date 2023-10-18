import Image from 'next/image'
import { Inter } from 'next/font/google'
import LogoImage from "@/assets/img/logo.png";
import React from "react";
import CartIcon from "@/assets/svg/cart.svg"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between bg-surface `}
    >
     <header className="w-full py-3 bg-surface shadow-md bg-blend-darken">
         <div className="container mx-auto">
             <div className="flex items-center justify-between">
                 <Image width={180} src={LogoImage} alt="Ajandekok.ro | Logo"/>
                 <div>
                     <div className="flex items-center ">
                         <span className="text-secondary mr-2 text-sm">Order</span>
                         <Image width={25} src={CartIcon} alt="Ajandekok.ro | Logo"/>
                     </div>

                 </div>
             </div>
         </div>
     </header>
    </main>
  )
}
