export type Locale = 'en' | 'pt-br'

export interface Product {
  id: string
  name: string
  asin: string
  image: string
  bestFor: string
  mainStrength: string
  mainWeakness: string
  rating: number
  priceRange: string
  affiliateUrl: string
  affiliateUrlBr?: string
}

export interface ProductReview {
  productId: string
  productName: string
  overview: string
  buildQuality: string
  performance: string
  valueForMoney: string
  whoShouldBuy: string
  whoShouldAvoid: string
  pros: string[]
  cons: string[]
  affiliateUrl: string
  rating: number
  image: string
}

export interface ComparisonRow {
  product: string
  bestFor: string
  mainAdvantage: string
  mainDownside: string
  priceRange: string
  rating: number
  affiliateUrl: string
}

export interface RecommendationCard {
  label: 'Best for Beginners' | 'Best Value' | 'Best Premium' | 'Best to Avoid' | string
  productName: string
  productId: string
  reason: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface InternalLink {
  title: string
  slug: string
  locale: Locale
}

export interface AdSlotPosition {
  id: string
  label: string
}

export interface SchemaData {
  products?: SchemaProduct[]
  reviews?: SchemaReview[]
}

export interface SchemaProduct {
  name: string
  description: string
  brand: string
  sku?: string
  priceRange?: string
  ratingValue?: number
  reviewCount?: number
}

export interface SchemaReview {
  author: string
  datePublished: string
  reviewRating: number
  reviewBody: string
  itemName: string
}

export interface Article {
  locale: Locale
  slug: string
  category: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  primaryKeyword: string
  secondaryKeywords: string[]
  heroImage?: string
  datePublished: string
  dateModified: string
  author: string
  recommendationCards: RecommendationCard[]
  products: Product[]
  comparisonTable: ComparisonRow[]
  reviews: ProductReview[]
  faqs: FAQ[]
  internalLinks: InternalLink[]
  finalVerdict: string
  schemaData?: SchemaData
}

export interface Category {
  slug: string
  name: Record<Locale, string>
  description: Record<Locale, string>
  icon: string
  color: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
