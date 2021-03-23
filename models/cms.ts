interface CmsBaseResult {
  limit: number
  offset: number
  totalCount: number
}

export interface Category {
  id: string
  name: string
}

export type CategoryResult = CmsBaseResult & {
  contents: Category[]
}

export interface ArticleResultItem {
  id: string
  publishedAt: string
  title: string
  body?: string
  image?: { url: string; height: number; width: number }
  categories: Category[]
  source?: string
}

export type ArticleResult = CmsBaseResult & {
  contents: ArticleResultItem[]
}
