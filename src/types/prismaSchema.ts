export interface Campaign {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: CampaignStatus;
  startDate: Date;
  endDate: Date;
  title: string;
  description?: string;
  currency: string;
  dollars: number;
  cents: number;
  createdBy: string | undefined;
  editedBy: string;
  imageUrl: string[];
}

export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
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
  ANONYMOUS = "ANONYMOUS",
  INDIVIDUAL_WITH_TAX_DEDUCTION = "INDIVIDUAL_WITH_TAX_DEDUCTION",
  GROUP_WITH_TAX_DEDUCTION = "GROUP_WITH_TAX_DEDUCTION",
  WITHOUT_TAX_DEDUCTION = "WITHOUT_TAX_DEDUCTION",
}

export interface Email {
  id: string;
  editedBy: string;
  createdAt: Date;
  updatedAt: Date;
  subject: string;
  content: string;
  version: number;
}
