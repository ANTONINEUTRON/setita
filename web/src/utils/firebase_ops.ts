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
    docRef.update({ id: docRef.id });
    return docRef;
}

export async function saveFundraisingToDB(fundraisingObj: Fundraising) {
    const fcColl = cFirestore.collection(FUNDRAISING_COLLECTION);
    //save to ipfs
    // Create a reference to the collection
    const docRef = await fcColl.add(fundraisingObj);

    // update
    docRef.update({ id: docRef.id });
    return docRef;
}