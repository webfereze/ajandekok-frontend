import React from 'react';
import {CheckBadgeIcon, XMarkIcon} from '@heroicons/react/24/solid'
import HeaderUser from "@/pages/components/HeaderUser";
import Footer from "@/pages/components/Footer";



// const { t } = useTranslation('common');

export default function Thankyou() {
    return (
        <>
        <HeaderUser/>
            <div className="container px-2 mx-auto ">
                <div
                    className={`relative my-5 flex mx-auto sm:w-1/2 md:1/3 lg:1/4 justify-between steps-border-full`}>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>1</span>
                        <p className="text-sm text-secondary font-semibold mt-1">Add photos</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>2</span>
                        <p className="text-sm text-secondary font-semibold mt-1">Configure</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>3</span>
                        <p className="text-sm text-secondary font-semibold mt-1">Place order</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>4</span>
                        <p className="text-sm text-secondary font-semibold mt-1">Thank you</p>
                    </div>
                </div>
            </div>
            <div className="min-h-3/4-screen bg-surface-100 py-20 bg-surface">
                <div className="text-center ">
                    <CheckBadgeIcon className="w-[150px] text-green-500 mx-auto"/>
                    <h1 className="text-center text-secondary text-3xl">Iti multumim pentru comanda</h1>
                    <p className="text-gray-500 mt-2">Comanda ta va fi procesata iar cineva va reveni pentru a confirma detaliile comenzii.</p>
                </div>
            </div>
        <Footer/>
        </>

    );
}
