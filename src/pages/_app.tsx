import '@/styles/globals.css'
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppProps } from 'next/app'
import store, {persistor} from '../userManagement/store'; // Import your Redux store and persistor

export default function App({ Component, pageProps }: AppProps) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
  );
}
