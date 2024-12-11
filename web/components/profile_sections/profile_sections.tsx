import CampaignOwnerDashboard from "../campaign_owner_dashboard";
import ProfileCampaigns from "./profile_campaigns";
import ProfileDonations from "./profile_donations";
import ProfileWallet from "./profile_wallet";

export default function ProfileSections() {


    return (
        <div className="rounded-xl">
            <div role="tablist" className="tabs tabs-boxed">
            <input type="radio" name="my_tabs_1" role="tab" className="tab md:w-2/6" aria-label="Campaigns" defaultChecked/>
                <div role="tabpanel" className="tab-content p-10">
                    <ProfileCampaigns />
                </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab md:w-2/6" aria-label="Donations" />
                <div role="tabpanel" className="tab-content p-10">
                    <ProfileDonations />
                </div>

            <input type="radio" name="my_tabs_1" role="tab" className="tab md:w-2/6" aria-label="Wallet" />
                <div role="tabpanel" className="tab-content p-10">
                    <ProfileWallet />
                </div>
            </div>
        </div>
    );
}
