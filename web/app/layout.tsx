import './global.css';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { APP_NAME } from '@/src/constants';
import Head from 'next/head';

export const metadata = {
  title: 'setita',
  description: 'decentralized milestone based crowdfunding platform',
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
      <Head>
        <meta property="dscvr:canvas:version" content="vNext" />
        <meta property="og:image" content="https://setita.com/brand/blink_1.png" />
      </Head>
      {/* <AppWalletProviders> */}
        {/* <WalletModalProvider> */}
          
      <body className='min-h-screen'>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              {children}
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
        <footer className='flex justify-center items-end'>
          <div className="mx-auto mt-3">
            &copy; {new Date().getFullYear()} {"   "+APP_NAME.toLowerCase()}
            
          </div>
        </footer>
      </body>
      {/* </AppWalletProviders> */}
    </html>
  );
}
