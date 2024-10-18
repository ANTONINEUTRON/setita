import { cFirestore } from "@/firebaseconfig";
import { DONATION_COLLECTION, FUNDRAISING_COLLECTION } from "../constants";
import { Fundraising } from "../types/fundraising";

export async function getFundRaisingRecord(donationId: string): Promise<Fundraising> {
    const fcColl = cFirestore.collection(FUNDRAISING_COLLECTION);

    let docSnap = await fcColl.doc(donationId).get();

    return docSnap.data() as Fundraising;
}

export async function saveDonationRecordToDB(donation: any) {
    const dnColl = cFirestore.collection(DONATION_COLLECTION);

    // Create a reference to the collection
    const docRef = await dnColl.add(donation);

    // update
    docRef.update({id: docRef.id});
    return docRef;
}

export async function getFundraisingByAddress(account: string): Promise<Fundraising[]> {
    const fcColl = cFirestore.collection(FUNDRAISING_COLLECTION);

    // Query the collection where the account field matches the given address
    const querySnapshot = await fcColl.where("account", "==", account).get();

    // Map over the results to return an array of Fundraising objects
    const fundraisingRecords = querySnapshot.docs.map(doc => doc.data() as Fundraising);

    return fundraisingRecords;
}

export async function fetchCampaigns(): Promise<Fundraising[]> {
    const fcColl = cFirestore.collection(FUNDRAISING_COLLECTION);

    // Query the collection where the account field matches the given address
    const querySnapshot = await fcColl.get();

    // Map over the results to return an array of Fundraising objects
    const fundraisingRecords = querySnapshot.docs.map(doc => doc.data() as Fundraising);

    return fundraisingRecords;
}

export async function saveFundraisingToDB(fundraisingObj: Fundraising) {
    const fcColl = cFirestore.collection(FUNDRAISING_COLLECTION);
    
    // Create a reference to the collection
    const docRef = await fcColl.add(fundraisingObj);

    // update
    docRef.update({ id: docRef.id });
    return docRef;
}