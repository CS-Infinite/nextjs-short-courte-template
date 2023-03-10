import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import Head from 'next/head';

import '@/styles/global.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/services/query';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>My Blog</title>
      </Head>

      <Component {...pageProps} />

      <style jsx global>{`
        font-family: ${inter.style.fontFamily};
      `}</style>
    </QueryClientProvider>
  );
}
