
import { Donation } from "./donation";

  // }
export interface Fundraising{
    id: string,
    account: string,
    data: Details,
}

interface Details{
    category: string,
    terms: string[],
    title: string,
    description: string,
    email: string,
    domain: string | unknown,
}

export const Category = { 
  education: "education", 
  health: "health", 
  environmental: "environmental", 
  community:"community"
}