import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Locale } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocalePath(locale: Locale, path: string = '') {
  const base = locale === 'en' ? '/en' : '/pt-br'
  return path ? `${base}/${path}` : base
}

export function getRatingColor(rating: number): string {
  if (rating >= 8.5) return 'text-green-600 bg-green-50'
  if (rating >= 7)   return 'text-blue-600 bg-blue-50'
  if (rating >= 5)   return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}

export function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale === 'pt-br' ? 'pt-BR' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  } as Intl.DateTimeFormatOptions)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const SITE_URL = 'https://betterwaycomparison.com'
export const SITE_NAME = 'Better Way Comparison'
