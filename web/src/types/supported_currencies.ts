export interface SupportCurrency {
    name: string;
    address: string;
}

export const supportedCurrencies: SupportCurrency[] = [
    {
        name: "SOL",
        address: "So11111111111111111111111111111111111111112", // Example address for SOL
    },
    {
        name: "USDC",
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // Example address for USDC
    },
    {
        name: "USDT",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // Example address for USDT
    },
    {
        name: "SEND",
        address: "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa", // Example address for SEND
    },
];