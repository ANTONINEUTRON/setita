
import { Donation } from "./donation";

  // }
export interface Fundraising{
    id: string,
    account: string,
    data: Details,
}

interface Details{
    category: Category,
    terms: string[],
    title: string,
    description: string,
    email: string,
}

export enum Category {education,health,environmental,community,}