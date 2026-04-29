import { Article } from '@/types'

import affordableWatches    from './en/best-affordable-watches'
import retinolSerum         from './en/best-retinol-serum'
import vitaminCSerum        from './en/best-vitamin-c-serum'
import airFryer             from './en/best-air-fryer'
import espressoMachine      from './en/best-espresso-machine'
import cordlessDrill        from './en/best-cordless-drill'
import milwaukeeVsDewalt    from './en/milwaukee-vs-dewalt'
import ergonomicChair       from './en/best-ergonomic-chair'
import carryOnLuggage       from './en/best-carry-on-luggage'
import dogCamera            from './en/best-dog-camera'

import affordableWatchesPt  from './pt-br/relogios-baratos-que-parecem-caros'
import retinolSerumPt        from './pt-br/melhor-serum-retinol'
import vitaminCSerumPt       from './pt-br/melhor-serum-vitamina-c'
import airFryerPt            from './pt-br/melhor-air-fryer-para-familia'
import espressoMachinePt     from './pt-br/melhor-maquina-de-espresso'
import cordlessDrillPt       from './pt-br/melhor-furadeira-parafusadeira-para-casa'
import milwaukeeVsDewaltPt   from './pt-br/milwaukee-vs-dewalt-vs-flex'
import ergonomicChairPt      from './pt-br/melhor-cadeira-ergonomica-ate-300-dolares'
import carryOnLuggagePt      from './pt-br/melhor-mala-de-bordo'
import dogCameraPt           from './pt-br/melhor-camera-para-cachorro'

export const allArticles: Article[] = [
  affordableWatches,
  retinolSerum,
  vitaminCSerum,
  airFryer,
  espressoMachine,
  cordlessDrill,
  milwaukeeVsDewalt,
  ergonomicChair,
  carryOnLuggage,
  dogCamera,
  affordableWatchesPt,
  retinolSerumPt,
  vitaminCSerumPt,
  airFryerPt,
  espressoMachinePt,
  cordlessDrillPt,
  milwaukeeVsDewaltPt,
  ergonomicChairPt,
  carryOnLuggagePt,
  dogCameraPt,
]

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug)
}

export function getArticlesByLocale(locale: string): Article[] {
  return allArticles.filter((a) => a.locale === locale)
}

export function getArticlesByCategory(category: string, locale?: string): Article[] {
  return allArticles.filter(
    (a) => a.category === category && (!locale || a.locale === locale),
  )
}

export function getFeaturedArticles(locale: string, limit = 6): Article[] {
  return getArticlesByLocale(locale).slice(0, limit)
}
