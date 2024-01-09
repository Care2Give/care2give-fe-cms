export interface Campaign {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: CampaignStatus;
  startDate: Date;
  endDate: Date;
  title: string;
  description?: string;
  currency: string;
  dollars: number;
  cents: number;
  createdBy: string;
  editedBy: string;
  imageUrl: string[];
}

export enum CampaignStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ARCHIVED = "Archived",
}

export interface CampaignDonationAmount {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  currency: string;
  dollars: number;
  cents: number;
  description?: string;
  campaignId: string;
}

export interface Donation {
  id: string;
  createdAt: Date;
  donationType: DonationType;
  donorFirstName?: string;
  donorLastName?: string;
  donorEmail?: string;
  donorNricA?: string;
  donorNricB?: string;
  donorTrainingPrograms?: string[];
  currency: string;
  dollars: number;
  cents: number;
  campaignId: string;
}

export enum DonationType {
  ANONYMOUS = "Anonymous",
  INDIVIDUAL_WITH_TAX_DEDUCTION = "Individual with tax deduction",
  GROUP_WITH_TAX_DEDUCTION = "Group with tax deduction",
  WITHOUT_TAX_DEDUCTION = "Without tax deduction",
}
