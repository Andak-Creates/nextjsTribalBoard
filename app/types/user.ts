export interface Business {
  name: string;
  type: string;
  industry: string;
}

export interface BusinessDetails {
  name: string;
  type: string;
  industry: string;
  companyDescription: string;
  ownershipType: string;
  netProfit: number;
  growthRate: number;
  proposalAmount: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  dateJoined: string;
  hasBusiness: boolean;
  businessDetails?: BusinessDetails;
  documents: number;
  fundabilityScore: number;
  status: string;
}

export interface FundabilityUpdate {
  fundabilityScore: number;
  reason?: string; // optional if you track reason
}
