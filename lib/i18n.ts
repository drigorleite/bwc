import { Locale } from '@/types'

export const locales: Locale[] = ['en', 'pt-br']
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  'en':    'English',
  'pt-br': 'Português (BR)',
}

export const hreflangMap: Record<Locale, string> = {
  'en':    'en-US',
  'pt-br': 'pt-BR',
}

export const amazonTagMap: Record<Locale, string> = {
  'en':    'betterwaycomp-20',
  'pt-br': 'betterwaycomp-22',
}

export const amazonBaseUrl: Record<Locale, string> = {
  'en':    'https://www.amazon.com',
  'pt-br': 'https://www.amazon.com.br',
}

export function buildAffiliateUrl(asin: string, locale: Locale): string {
  const base = amazonBaseUrl[locale]
  const tag  = amazonTagMap[locale]
  return `${base}/dp/${asin}?tag=${tag}`
}

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home':               'Home',
    'nav.categories':         'Categories',
    'nav.best':               'Best Picks',
    'nav.about':              'About',
    'nav.contact':            'Contact',
    'hero.title':             'Find the right product for your exact needs.',
    'hero.subtitle':          'Clear, honest product comparisons for smarter buying decisions.',
    'hero.cta.primary':       'Explore Comparisons',
    'hero.cta.secondary':     'See Best Picks',
    'featured.categories':    'Featured Categories',
    'featured.articles':      'Featured Comparisons',
    'how.title':              'How We Choose Products',
    'how.desc':               'Every recommendation is based on real research, user feedback, and value analysis — never paid placement.',
    'disclosure':             'As an Amazon Associate, we may earn from qualifying purchases. This does not affect our editorial independence.',
    'cta.check.price':        'Check Price on Amazon',
    'cta.see.price':          'See Latest Price',
    'cta.view.amazon':        'View on Amazon',
    'rating':                 'Rating',
    'best.for':               'Best for',
    'strength':               'Main Strength',
    'weakness':               'Main Weakness',
    'price.range':            'Price Range',
    'pros':                   'Pros',
    'cons':                   'Cons',
    'verdict':                'Final Verdict',
    'faq':                    'Frequently Asked Questions',
    'related':                'Related Articles',
    'overview':               'Overview',
    'build.quality':          'Build Quality',
    'performance':            'Performance',
    'value':                  'Value for Money',
    'who.should.buy':         'Who Should Buy',
    'who.should.avoid':       'Who Should Avoid',
    'comparison.table':       'Full Comparison Table',
    'footer.disclosure':      'Affiliate Disclosure',
    'footer.privacy':         'Privacy Policy',
    'footer.terms':           'Terms of Use',
    'footer.tagline':         'Honest comparisons for smarter buyers.',
    'newsletter.title':       'Get our best picks in your inbox',
    'newsletter.subtitle':    'No spam, only genuinely useful product roundups.',
    'newsletter.placeholder': 'Your email address',
    'newsletter.cta':         'Subscribe',
    'not.disclosed':          'Not officially disclosed.',
    'updated':                'Last updated',
    'by':                     'By',
  },
  'pt-br': {
    'nav.home':               'Início',
    'nav.categories':         'Categorias',
    'nav.best':               'Melhores Picks',
    'nav.about':              'Sobre',
    'nav.contact':            'Contato',
    'hero.title':             'Encontre o produto certo para a sua situação específica.',
    'hero.subtitle':          'Comparações honestas e claras para decisões de compra mais inteligentes.',
    'hero.cta.primary':       'Explorar Comparações',
    'hero.cta.secondary':     'Ver Melhores Picks',
    'featured.categories':    'Categorias em Destaque',
    'featured.articles':      'Comparações em Destaque',
    'how.title':              'Como Escolhemos os Produtos',
    'how.desc':               'Cada recomendação é baseada em pesquisa real, feedback de usuários e análise de valor — nunca em anúncios pagos.',
    'disclosure':             'Como Associado Amazon, podemos ganhar comissão em compras qualificadas. Isso não afeta nossa independência editorial.',
    'cta.check.price':        'Ver Preço na Amazon',
    'cta.see.price':          'Ver Preço Atual',
    'cta.view.amazon':        'Ver na Amazon',
    'rating':                 'Nota',
    'best.for':               'Ideal Para',
    'strength':               'Principal Vantagem',
    'weakness':               'Principal Desvantagem',
    'price.range':            'Faixa de Preço',
    'pros':                   'Pontos Positivos',
    'cons':                   'Pontos Negativos',
    'verdict':                'Veredicto Final',
    'faq':                    'Perguntas Frequentes',
    'related':                'Artigos Relacionados',
    'overview':               'Visão Geral',
    'build.quality':          'Qualidade de Construção',
    'performance':            'Desempenho',
    'value':                  'Custo-Benefício',
    'who.should.buy':         'Quem Deve Comprar',
    'who.should.avoid':       'Quem Deve Evitar',
    'comparison.table':       'Tabela Comparativa Completa',
    'footer.disclosure':      'Divulgação de Afiliados',
    'footer.privacy':         'Política de Privacidade',
    'footer.terms':           'Termos de Uso',
    'footer.tagline':         'Comparações honestas para compradores mais inteligentes.',
    'newsletter.title':       'Receba nossas melhores indicações por e-mail',
    'newsletter.subtitle':    'Sem spam, apenas listas de produtos genuinamente úteis.',
    'newsletter.placeholder': 'Seu endereço de e-mail',
    'newsletter.cta':         'Assinar',
    'not.disclosed':          'Não divulgado oficialmente.',
    'updated':                'Atualizado em',
    'by':                     'Por',
  },
}

export function t(locale: Locale, key: string): string {
  return translations[locale][key] ?? key
}
