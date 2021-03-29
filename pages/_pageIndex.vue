<template>
  <div class="container">
    <header>
      <div v-if="pageIndex === 0 && !categoryName" class="content">
        <p>インターネットにあるイケてるものを並べるブログ</p>
        <p>
          主に音楽やデザイン、電子工作のプロジェクトを集めています<br />
          最近はメカニカルキーボードが好き
        </p>
        <Share class="share" />
      </div>
    </header>
    <main>
      <Pager
        v-if="!(pageIndex === 0 && !categoryName)"
        :state="{
          pageIndex,
          categoryName,
          articlesTotalCount,
          articlesOffset,
        }"
      />
      <ArticleIndexItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
      <Pager
        :state="{
          pageIndex,
          categoryName,
          articlesTotalCount,
          articlesOffset,
        }"
      />
    </main>
    <Loading :loading="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
header {
  .content {
    width: calc(100% - 2rem);
    margin: 1rem 1rem 1rem 1rem;
    padding: 1rem;
    background-color: white;
    p {
      font-size: small;
      margin-top: 1rem;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  .share {
    margin: 1rem 0 0 0;
  }
}
main {
  width: 100%;
  overflow: hidden;
  @media screen and (min-width: 800px) {
    overflow: unset;
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  wrapProperty,
  useRoute,
  useContext,
  computed,
} from '@nuxtjs/composition-api'
import { ArticleResult, Category, CategoryResult } from '@/scripts/cms'
import { getSourceKind, Article, getSources } from '@/scripts/article'

const useConfig = wrapProperty('$config', false)

export default defineComponent({
  setup(_props, _context) {
    const route = useRoute()
    const config = useConfig()
    const { $axios } = useContext()

    const isLoading = ref(true)

    const pageIndex = computed(() => {
      const ret = Number(route.value.params.pageIndex)
      if (isNaN(ret)) return 0
      return ret
    })

    const articles = ref<Article[]>([])
    const articlesTotalCount = ref(0)
    const articlesOffset = computed(() => {
      return pageIndex.value * config.ITEMS_PER_PAGE
    })

    const category = ref<Category>()
    const categoryName = computed(() => route.value.params.category)

    useFetch(async () => {
      let filters
      if (categoryName.value) {
        const result = await $axios.get<CategoryResult>(
          config.MICROCMS_API_BASE_URL + 'categories',
          {
            headers: {
              'X-API-KEY': config.MICROCMS_X_API_KEY,
            },
            params: {
              limit: 1,
              fields: 'id,name',
              filters: `name[equals]${categoryName.value}`,
            },
          }
        )
        category.value = result.data.contents[0]
        filters = `categories[contains]${category.value.id}`
      }
      const result = await $axios.get<ArticleResult>(
        config.MICROCMS_API_BASE_URL + 'articles',
        {
          headers: {
            'X-API-KEY': config.MICROCMS_X_API_KEY,
          },
          params: {
            limit: config.ITEMS_PER_PAGE,
            orders: '-publishedAt',
            fields:
              'id,publishedAt,title,image,categories.name,categories.id,source',
            offset: articlesOffset.value,
            filters,
          },
        }
      )
      articlesTotalCount.value = result.data.totalCount
      if (result.data.contents.length) {
        articles.value.push(
          ...result.data.contents.map((v) => ({
            ...v,
            sourceDetail: getSourceKind(v),
            sources: getSources(v.source ?? ''),
          }))
        )
      }
      isLoading.value = false
    })
    return {
      isLoading,
      articles,
      pageIndex,
      categoryName,
      articlesTotalCount,
      articlesOffset,
    }
  },
})
</script>
