import './global.css';
import 'antd/dist/reset.css';

import { ConfigProvider as AntdConfigProvider } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import moment from 'moment';
import type { AppProps } from 'next/app';
import 'moment/locale/es';
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from '../context/provider';
import ApolloProviderWrapper from '../providers/ApolloProvider';

moment.locale('es');

function MyApp({ Component, pageProps }: AppProps) {


  console.log(JSON.stringify({ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY }, null, 2));



  return (
    <ClerkProvider
      {...pageProps}
      // publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      publishableKey={'pk_test_aGFyZHktd2Vhc2VsLTY2LmNsZXJrLmFjY291bnRzLmRldiQ'}
    >
      <AntdConfigProvider locale={esES}>
        <ApolloProviderWrapper>
          <AppContextProvider>
            <Component {...pageProps} />
          </AppContextProvider>
        </ApolloProviderWrapper>
      </AntdConfigProvider>
    </ClerkProvider>
  );
}

export default MyApp;
