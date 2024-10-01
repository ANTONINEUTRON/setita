// Fundraising Camapaign

import { CampaignGoal } from "./campaign_goal";
import { SupportCurrency } from "./supported_currencies";

export interface Fundraising{
    id: string,
    account: string,
    data: CampaignDetails,
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
    supportedCurrencies: SupportCurrency[],
    images: File[],
    video?: File,
}
 