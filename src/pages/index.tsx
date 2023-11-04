import React from "react";
import HeaderUser from "@/pages/components/HeaderUser";
import PhotoOrder from "@/pages/components/PhotoOrder";
import Footer from "@/pages/components/Footer";
import LanguageSwitcher from "@/pages/components/LanguageSwitcher";
import { useTranslation } from 'next-i18next';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main
      className={`min-h-screen bg-white`}
    >
      <HeaderUser/>
      <div className="text-secondary">
        <LanguageSwitcher />
        <h1>{t('hello')}</h1>
        <p>{t('welcome')}</p>
        <p>{t('language')}</p>
      </div>
      <PhotoOrder/>
      <Footer/>
    </main>
  )
}

export const getStaticProps = async (context:any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};