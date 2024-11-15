import './global.css';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { APP_NAME } from '@/src/constants';
import { Mulish, Poppins, Roboto } from '@next/font/google';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});


const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: 'setita',
  description: 'Decentralized milestone based fundraising platform on solana',
  other: {
    viewport: "width=device-width, initial-scale=1",
    "dscvr:canvas:version": "vNext",
    "og:image": "https://setita.com/brand/blink_1.png",
  },
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Counter Program', path: '/counter' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'min-h-screen '+mulish.className}>

        <ReactQueryProvider>
            <SolanaProvider>
              <Toaster />
              {children}
            </SolanaProvider>
        </ReactQueryProvider>
        <div className='mt-8'>
          <Footer />
        </div>

        {/* <footer className='flex justify-center items-end'>
          <div className="mx-auto mt-3">
            &copy; {new Date().getFullYear()} {"   "+APP_NAME.toLowerCase()}
          </div>
        </footer> */}

      </body>
    </html>
  );
}
