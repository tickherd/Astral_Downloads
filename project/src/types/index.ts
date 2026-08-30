export type SubscriptionTier = 'free' | 'intel' | 'classified';

export type Route =
  | { name: 'home' }
  | { name: 'auth'; mode: 'signin' | 'signup' }
  | { name: 'section'; slug: string }
  | { name: 'article'; id: string };

export interface Section {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  articles: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  section: string;
  sectionSlug: string;
  date: string;
  readTime: string;
  tier: SubscriptionTier;
  classified: boolean;
  author: string;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  slug: string;
  badge: string;
  price: string;
}

export interface PricingTier {
  id: SubscriptionTier;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}
