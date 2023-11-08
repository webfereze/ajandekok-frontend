import Image from 'next/image'
import LogoImage from "@/assets/img/logo.png";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {logout} from "@/userManagement/userSlice";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import {Bars3BottomRightIcon, HomeIcon, ShoppingCartIcon, XMarkIcon} from "@heroicons/react/24/outline";
import LanguageSwitcher from "@/pages/components/LanguageSwitcher";

export default function HeaderAdmin() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state:any) => state.user);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/admin/login');
    }
    const { t } = useTranslation('common'); // 'common' corresponds to the translation file name (e.g., common.json)

    return (

     <header className="w-full py-3 bg-surface shadow-md">
         <div className="container mx-auto">
             <div className="flex items-center justify-between">
                 <Link href="/">
                     <Image width={180} src={LogoImage} alt="Ajandekok.ro | Logo"/>
                 </Link>

                 <div>
                     <div className="items-center text-secondary hidden md:flex">
                         <Link className="cursor-pointer mr-4 " href="/admin">Orders</Link>
                         <Link className="cursor-pointer " href="/admin/canvas">Canvas settings</Link>
                         <button className="bg-primary text-surface px-4 py-2 rounded-sm ml-2" onClick={handleLogout}>Logout</button>
                     </div>


                     <div className="flex md:hidden">
                         {!isMobileMenuOpen && <Bars3BottomRightIcon onClick={()=>setIsMobileMenuOpen(true)} className="w-8 h-8 text-primary"/>}
                         {isMobileMenuOpen && <XMarkIcon onClick={()=>setIsMobileMenuOpen(false)} className="w-8 h-8 text-primary"/>}
                     </div>

                     {isMobileMenuOpen && <>
                         <div className="block md:hidden fixed left-0 right-0 top-[50px] bg-white py-2 z-[9] shadow-md text-secondary px-4">
                             <Link className="cursor-pointer mr-4 block mb-3" href="/admin">Orders</Link>
                             <Link className="cursor-pointer block mb-3 " href="/admin/canvas">Canvas settings</Link>
                             <button className="bg-primary text-surface px-4 py-2 rounded-sm " onClick={handleLogout}>Logout</button>
                         </div>
                     </>}


                 </div>
             </div>
         </div>
     </header>
  )
}
