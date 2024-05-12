'use client';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const RootLayout = ({ children }) => {
  const title = 'Demo App';

  return (
    <Provider store={store}>
      <html>
        <Head>
          <title>{title}</title> 
        </Head>
        <body>
          <div>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </Provider>
  );
}

export default RootLayout;