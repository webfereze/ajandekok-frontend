import Image from 'next/image'
import LogoImage from "@/assets/img/logo.png";
import React, {useState} from "react";
import {ShoppingCartIcon, HomeIcon, Bars3BottomRightIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Link from "next/link";
import LanguageSwitcher from "@/pages/components/LanguageSwitcher";
import {useTranslation} from "next-i18next";

export default function HeaderUser() {
    const {t} = useTranslation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (

      <header className="w-full py-3  shadow-md sticky top-0 bg-white z-10">
          <div className="container mx-auto">
              <div className=" flex items-center justify-between">
                  <Link passHref href="/">
                      <Image width={180} src={LogoImage} alt="Ajandekok.ro | Logo"/>
                  </Link>
                  <div className="flex items-center justify-center">
                      <div className="flex md:hidden">
                          <LanguageSwitcher />
                          {!isMobileMenuOpen && <Bars3BottomRightIcon onClick={()=>setIsMobileMenuOpen(true)} className="w-8 h-8 text-primary"/>}
                          {isMobileMenuOpen && <XMarkIcon onClick={()=>setIsMobileMenuOpen(false)} className="w-8 h-8 text-primary"/>}
                      </div>

                      <div className="hidden md:flex">
                          <Link className="flex items-center px-2" href="/">
                              <ShoppingCartIcon className="w-6 h-6 text-primary mr-1"/>
                              <span className="text-secondary mr-2 text-sm font-semibold">{t('global.header.order')}</span>
                          </Link>
                          <Link className="flex items-center px-2" href="https://ajandekok.ro/#contact">
                              <HomeIcon className="w-6 h-6 text-primary mr-1"/>
                              <span className="text-secondary mr-2 text-sm font-semibold">{t('global.header.contact')}</span>
                          </Link>
                          <LanguageSwitcher />
                      </div>

                      {isMobileMenuOpen && <>
                          <div className="block md:hidden fixed left-0 right-0 top-[50px] bg-white py-2 z-[9] shadow-md">
                              <Link className="flex items-center px-2 py-2" href="/">
                                  <ShoppingCartIcon className="w-6 h-6 text-primary mr-1"/>
                                  <span className="text-secondary mr-2 text-sm font-semibold">{t('global.header.order')}</span>
                              </Link>
                              <Link className="flex items-center px-2 py-2" href="https://ajandekok.ro/#contact">
                                  <HomeIcon className="w-6 h-6 text-primary mr-1"/>
                                  <span className="text-secondary mr-2 text-sm font-semibold">{t('global.header.contact')}</span>
                              </Link>
                          </div>
                      </>}

                  </div>
              </div>
          </div>
      </header>
  )
}
