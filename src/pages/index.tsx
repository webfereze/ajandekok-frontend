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