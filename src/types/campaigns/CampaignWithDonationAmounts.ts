import { Campaign, CampaignDonationAmount } from "../prismaSchema";

export type CampaignsWithDonationAmounts = {
  donationAmounts: CampaignDonationAmount[];
} & Campaign;
