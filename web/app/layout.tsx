import './global.css';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { APP_NAME } from '@/src/constants';
import { Poppins } from '@next/font/google';
import { OktoProvider, BuildType } from 'okto-sdk-react';

const poppins = Poppins({
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
      <body className={'min-h-screen '+poppins.className}>

        <ReactQueryProvider>
            <SolanaProvider>
              {children}
            </SolanaProvider>
        </ReactQueryProvider>

        <footer className='flex justify-center items-end'>
          <div className="mx-auto mt-3">
            &copy; {new Date().getFullYear()} {"   "+APP_NAME.toLowerCase()}
          </div>
        </footer>

      </body>
    </html>
  );
}
