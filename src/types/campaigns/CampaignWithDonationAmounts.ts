import { Campaign, CampaignDonationAmount } from "../prismaSchema";

// Type for retrieval of Campaign with donationAmounts from DB
export type CampaignWithDonationAmounts = {
  donationAmounts: CampaignDonationAmount[];
} & Campaign;
