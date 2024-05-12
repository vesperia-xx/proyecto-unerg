'use client';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const RootLayout = ({ children }) => {
  const title = 'UNERG-APP';

  return (
    <Provider store={store}>
      <html>
        <head>
          <title>{title}</title> 
        </head>
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