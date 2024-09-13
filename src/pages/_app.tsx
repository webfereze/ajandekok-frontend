import '@/styles/globals.css'
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppProps } from 'next/app'
import store, {persistor} from '../userManagement/store';
import { appWithTranslation } from 'next-i18next';
import {useRouter} from "next/router";

function App({ Component, pageProps }: AppProps) {

    const router = useRouter()

    useEffect(() => {
        import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init('715881563676260') // facebookPixelId
                ReactPixel.pageView()

                router.events.on('routeChangeComplete', () => {
                    ReactPixel.pageView()
                })
            })
    }, [router.events])

     return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
      </Provider>
  );
}


export default appWithTranslation(App);
