import { Campaign, DonationType } from "../prismaSchema";

export type DonationTable = {
  cents: number;
  createdAt: Date;
  currency: string;
  dollars: number;
  donationType: DonationType;
  donorEmail?: string;
  donorFirstName?: string;
  donorLastName?: string;
  nric?: string;
  donorTrainingPrograms?: string[];
  id: string;
  campaign: Campaign;
};
