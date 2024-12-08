// Fundraising Camapaign

import { CampaignGoal } from "./campaign_goal";
import { Milestone } from "./milestone";

export interface Fundraising{
    id: string,
    account: string,
    data: CampaignDetails,
    trxHash: string,
}

export interface CampaignDetails{
    category: string,
    terms?: string[],
    title: string,
    description: string,
    email?: string,
    domain?: string | unknown,
    location?: string,
    duration?: any[] | null,
    goal?: CampaignGoal | null,
    supportedCurrencies: string[],
    images: any[],
    video?: any,
    milestones?: Milestone[]
}
 