import React from "react";
import HeaderUser from "@/pages/components/HeaderUser";
import PhotoOrder from "@/pages/components/PhotoOrder";
import Footer from "@/pages/components/Footer";
import LanguageSwitcher from "@/pages/components/LanguageSwitcher";
import { useTranslation } from 'next-i18next';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useRouter} from "next/router";

export default function Home() {
  const { t } = useTranslation();

  return (
      <>
        <Head>
          <title>
            PozaCanvas.ro | Part of Ajandekok.ro
          </title>
          <meta
              name="description"
              content="pozacanvas.ro – Tervezd meg saját egyedi ajándékod!"
              key="desc"
          />
        </Head>

        <main
            className={`min-h-screen bg-white`}
        >
          <HeaderUser/>
          <PhotoOrder/>
          <Footer/>
        </main>

      </>

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