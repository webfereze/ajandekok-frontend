import Image from 'next/image'
import LogoImage from "@/assets/img/logo.png";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {logout} from "@/userManagement/userSlice";
import Link from "next/link";
import {useTranslation} from "next-i18next";

export default function HeaderAdmin() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state:any) => state.user);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/admin/login');
    }
    const { t } = useTranslation('common'); // 'common' corresponds to the translation file name (e.g., common.json)

    return (

     <header className="w-full py-3 bg-surface shadow-md">
         <div className="container mx-auto">
             <div className="flex items-center justify-between">
                 <Link href="/admin">
                     <Image width={180} src={LogoImage} alt="Ajandekok.ro | Logo"/>
                 </Link>
                 <div className="text-secondary">
                     <h1>{t('welcome')}</h1>
                     <p>{t('greeting', { name: 'John' })}</p>
                 </div>

                 <div>
                     <div className="flex items-center text-secondary">
                         <Link className="cursor-pointer" href="/admin/canvas">Canvas settings</Link>
                         <button className="bg-primary text-surface px-4 py-2 rounded-sm ml-2" onClick={handleLogout}>Logout</button>
                     </div>
                 </div>
             </div>
         </div>
     </header>
  )
}
