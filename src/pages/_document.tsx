import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

export default function Document() {


  return (
    <Html lang="ro">
        <Head>
            <link rel='icon' href='favicon.ico'/>
                <title>
                    PozaCanvas.ro | Part of Ajandekok.ro
                </title>
                <meta
                    name="description"
                    content="pozacanvas.ro – Tervezd meg saját egyedi ajándékod!"
                    key="desc"
                />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
