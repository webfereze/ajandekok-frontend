import React from 'react';
import {CheckBadgeIcon, XMarkIcon} from '@heroicons/react/24/solid'
import HeaderUser from "@/pages/components/HeaderUser";
import Footer from "@/pages/components/Footer";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";



// const { t } = useTranslation('common');

export default function Thankyou() {
    const { t } = useTranslation();

    return (
        <>
        <HeaderUser/>
            <div className="container px-2 mx-auto ">
                <div
                    className={`relative my-5 flex mx-auto sm:w-1/2 md:1/3 lg:1/4 justify-between steps-border-full`}>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>1</span>
                        <p className="text-sm text-secondary font-semibold mt-1">{t('global.step.1')}</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>2</span>
                        <p className="text-sm text-secondary font-semibold mt-1">{t('global.step.2')}</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>3</span>
                        <p className="text-sm text-secondary font-semibold mt-1">{t('global.step.3')}</p>
                    </div>
                    <div className="text-center flex flex-col">
                        <span
                            className={`text-white bg-primary w-8 h-8 flex mx-auto items-center justify-center border-primary border-2 rounded-full cursor-pointer z-[2]`}>4</span>
                        <p className="text-sm text-secondary font-semibold mt-1">{t('global.step.4')}</p>
                    </div>
                </div>
            </div>
            <div className="min-h-3/4-screen bg-surface-100 py-20 bg-surface">
                <div className="text-center ">
                    <CheckBadgeIcon className="w-[150px] text-green-500 mx-auto"/>
                    <h1 className="text-center text-secondary text-3xl">{t('page.thankyou.text')}</h1>
                    <p className="text-gray-500 mt-2">{t('page.thankyou.desc')}</p>
                </div>
            </div>
        <Footer/>
        </>

    );
}

export const getStaticProps = async (context:any) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};