import { ArticleResultItem } from '~/scripts/cms'

interface SourceDetail {
  kind: 'youtube' | 'twitter' | 'normal' | 'imgur' | 'unknown'
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

function getImgurId(url: string) {
  if (url.startsWith('https://imgur.com/')) {
    return url.replace('https://imgur.com/', '').slice(0, 7)
  }
  if (url.startsWith('https://i.imgur.com/') && url.endsWith('.jpg')) {
    return url
      .replace('https://i.imgur.com/', '')
      .replace('.jpg', '')
      .slice(0, 7)
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
    const imgurId = getImgurId(article.source)
    if (imgurId) {
      return {
        kind: 'imgur',
        id: imgurId,
        thumbnail: `https://i.imgur.com/${imgurId}l.jpg`,
      }
    }
  }
  return {
    kind: 'unknown',
  }
}
