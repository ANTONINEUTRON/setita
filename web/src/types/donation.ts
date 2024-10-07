import { Milestone } from "./milestone";

export interface Donation{
    address: string,
    details: DonationDetails,
    donationId: string | null | unknown,
}

export interface DonationDetails{
    donationType: string,
    amount: number,
    initialAmount?: number,
    milestones?: Milestone[],
}

// export enum DonationType{
//     USDC, SOL, SEND,
// }

// export const DonationType = { USDC : "USDC",
// SOL : "SOL",
// SEND :"SEND",
// };