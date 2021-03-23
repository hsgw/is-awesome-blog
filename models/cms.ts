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

interface SourceDetail {
  kind: 'youtube' | 'twitter' | 'normal' | 'unknown'
  thumbnail?: string
  id?: string
}

export type Article = ArticleResultItem & {
  body?: string
  sourceDetail: SourceDetail
}

function getYoutubeVideoId(url: string) {
  if (url.startsWith('https://www.youtube.com/watch?v=')) {
    return url.replace('https://www.youtube.com/watch?v=', '').split('?')[0]
  }
  if (url.startsWith('https://youtu.be/')) {
    return url.replace('https://youtu.be/', '').split('?')[0]
  }
  return undefined
}

function getTwitterStatusId(url: string) {
  if (url.startsWith('https://twitter.com/')) {
    return url.replace('https://twitter.com/', '').split('/').slice(-1)[0]
  }
}

export function getSourceKind(article: ArticleResultItem): SourceDetail {
  if (article.image) {
    return {
      kind: 'normal',
      thumbnail: article.image.url,
    }
  }
  if (article.source) {
    const youtubeId = getYoutubeVideoId(article.source)
    if (youtubeId) {
      return {
        kind: 'youtube',
        id: youtubeId,
        thumbnail: `http://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
      }
    }
    const twitterId = getTwitterStatusId(article.source)
    if (twitterId) {
      return {
        kind: 'twitter',
        id: twitterId,
      }
    }
  }
  return {
    kind: 'unknown',
  }
}
