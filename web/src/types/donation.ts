import { Milestone } from "./milestone";

export interface Donation{
    address: string,//donor address
    details: DonationDetails,
    donationId: string | null | unknown,
}

export interface DonationDetails{
    donationType: string,
    amount: number,//initial commitment
    milestones?: Milestone[],
}