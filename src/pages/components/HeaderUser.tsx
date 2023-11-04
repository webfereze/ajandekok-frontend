import Image from 'next/image'
import LogoImage from "@/assets/img/logo.png";
import React from "react";
import {ShoppingCartIcon, HomeIcon, Bars3BottomRightIcon} from '@heroicons/react/24/outline'
import Link from "next/link";

export default function HeaderUser() {

  return (

      <header className="w-full py-3 bg-white shadow-md ">
          <div className="container mx-auto">
              <div className="flex items-center justify-between">
                  <Link passHref href="/">
                      <Image width={180} src={LogoImage} alt="Ajandekok.ro | Logo"/>
                  </Link>
                  <div className="flex items-center justify-center">
                      <div className="block md:hidden">
                          <Bars3BottomRightIcon className="w-8 h-8 text-primary"/>
                      </div>
                      <div className="hidden md:flex">
                          <Link className="flex items-center px-2" href="/">
                              <ShoppingCartIcon className="w-6 h-6 text-primary mr-1"/>
                              <span className="text-secondary mr-2 text-sm font-semibold">Order</span>
                          </Link>
                          <Link className="flex items-center px-2" href="https://ajandekok.ro/#contact">
                              <HomeIcon className="w-6 h-6 text-primary mr-1"/>
                              <span className="text-secondary mr-2 text-sm font-semibold">Contact</span>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </header>
  )
}
