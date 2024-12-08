export interface SupportCurrency {
    name: string;
    address: string;
    decimals: number; // Adding the decimals field
}

export const supportedCurrencies: SupportCurrency[] = [
    {
        name: "SOL",
        address: "So11111111111111111111111111111111111111112", 
        decimals: 9, 
    },
    {
        name: "USDC",
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", 
        decimals: 6, 
    },
    {
        name: "USDT",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", 
        decimals: 6,
    },
    // {
    //     name: "SEND",
    //     address: "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa", 
    //     decimals: 9,
    // },
];
