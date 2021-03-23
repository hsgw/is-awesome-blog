<template>
  <div class="container">
    <div>
      <header>
        <div class="content">
          <p>インターネットにあるイケてるものを並べるブログ</p>
          <p>
            主に音楽やデザイン、電子工作のプロジェクトを集めています<br />
            最近はメカニカルキーボードが好き
          </p>
        </div>
      </header>
      <main>
        <ArticleIndexItem
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  .content {
    margin: 1rem 1rem 1.5rem 1rem;
    padding: 1rem;
    font-size: small;
    background-color: white;
    max-width: 600px;
    p {
      margin-top: 1rem;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
  }
}
main {
  max-width: 600px;
}
</style>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  wrapProperty,
} from '@nuxtjs/composition-api'
import axios from 'axios'
import { ArticleResult, getSourceKind, Article } from '@/models/cms'

const useConfig = wrapProperty('$config', false)

export default defineComponent({
  setup(_props, _context) {
    const articles = ref<Article[]>([])
    const articlesTotalCount = ref(0)
    const currentArticlesOffset = ref(0)
    const config = useConfig()

    const getNextArticles = async () => {
      const result = await axios.get<ArticleResult>(
        config.MICROCMS_API_BASE_URL + 'articles',
        {
          headers: {
            'X-API-KEY': config.MICROCMS_X_API_KEY,
          },
          params: {
            limit: 10,
            orders: '-publishedAt',
            fields:
              'id,publishedAt,title,image,categories.name,categories.id,source',
            offset: currentArticlesOffset.value,
          },
        }
      )
      articlesTotalCount.value = result.data.totalCount
      if (result.data.contents.length) {
        articles.value.push(
          ...result.data.contents.map((v) => ({
            ...v,
            sourceDetail: getSourceKind(v),
          }))
        )
        currentArticlesOffset.value += result.data.contents.length
      }
    }

    useFetch(async () => {
      await getNextArticles()
    })
    return { articles }
  },
})
</script>
