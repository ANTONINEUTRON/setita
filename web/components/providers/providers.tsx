'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { JotaiProvider } from '@/libs/providers/jotai_provider';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { HELIUS_ENDPOINT } from '@/libs/constants';

export default function Providers({ children }: { children: React.ReactNode }) {
    const solanaConnectors = toSolanaWalletConnectors({

        shouldAutoConnect: true,
    });
    
    return (
        <JotaiProvider>
            <ReactQueryProvider>
                <SolanaProvider>
                    <PrivyProvider
                        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ""}
                        config={{
                            solanaClusters: [{ name: 'devnet', rpcUrl: HELIUS_ENDPOINT }],
                            appearance: {
                                // Use 'solana-only' or 'ethereum-and-solana'
                                walletChainType: 'solana-only',
                                walletList: ['detected_wallets', 'phantom', 'okx_wallet', 'wallet_connect', 'coinbase_wallet'], 
                            },
                            externalWallets: {
                                solana: {
                                    connectors: solanaConnectors,
                                    
                                },
                            },
                        }}
                        // config={{
                        //     // Customize Privy's appearance in your app
                        //     appearance: {
                        //         theme: 'light',
                        //         accentColor: '#676FFF',
                        //         logo: 'https://your-logo-url',
                        //     },
                        //     // Create embedded wallets for users who don't have a wallet
                        //     embeddedWallets: {
                        //         createOnLogin: 'users-without-wallets',
                        //     },
                        // }}
                    >
                        {children}
                    </PrivyProvider>
                </SolanaProvider>
            </ReactQueryProvider>
        </JotaiProvider>
    );
}