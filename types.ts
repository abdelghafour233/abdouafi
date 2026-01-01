
export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
  price?: string;
}

export interface AdSettings {
  headCode: string;
  bodyTopCode: string;
  footerCode: string;
  enabled: boolean;
}

export interface PlatformSettings {
  adminPassword: string;
  siteName: string;
  ads: AdSettings;
}
