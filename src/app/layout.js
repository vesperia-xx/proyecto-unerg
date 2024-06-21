'use client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import Head from 'next/head';

const RootLayout = ({ children }) => {
  const title = 'UNERG-APP';

  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <div>
              <main>{children}</main>
            </div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
