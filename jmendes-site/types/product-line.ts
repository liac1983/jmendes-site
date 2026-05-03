export type SanityImageWithAlt = {
  alt?: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
}

export type ProductLineTranslation = {
  title?: string
  subtitle?: string
  aboutText?: string
  highlights?: string[]
  materials?: string[]
  finishes?: string[]
  dimensions?: {
    width?: string
    height?: string
    depth?: string
  }
  technicalFeatures?: string[]
  advantages?: string[]
  idealFor?: string[]
}

export type ProductLine = {
  _id: string
  title: string
  slug: string
  category: string
  availability: 'available' | 'unavailable'
  subtitle: string
  aboutText: string
  heroImage?: SanityImageWithAlt
  aboutImage?: SanityImageWithAlt
  gallery?: SanityImageWithAlt[]
  highlights?: string[]
  materials?: string[]
  finishes?: string[]
  dimensions?: {
    width?: string
    height?: string
    depth?: string
  }
  technicalFeatures?: string[]
  advantages?: string[]
  idealFor?: string[]
  orderRank?: number
  translations?: Partial<
    Record<'pt' | 'en' | 'fr' | 'es', ProductLineTranslation>
  >
}
