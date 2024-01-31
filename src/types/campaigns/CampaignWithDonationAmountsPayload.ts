import { Campaign } from "../prismaSchema";
import { CampaignDonationAmountPayload } from "./CampaignDonationAmountPayload";

// Type for JSON payload for POST request to create Campaign with donationAmounts
export type CampaignWithDonationAmountsPayload = {
  donationAmounts: CampaignDonationAmountPayload[];
} & Campaign;
