<template>
  <div class="container">
    <div>
      <header>
        <div v-if="!hasPrev && !categoryName" class="content">
          <p>インターネットにあるイケてるものを並べるブログ</p>
          <p>
            主に音楽やデザイン、電子工作のプロジェクトを集めています<br />
            最近はメカニカルキーボードが好き
          </p>
        </div>
        <div v-if="categoryName" class="categoryTitle">
          {{
            `#${categoryName[0].toUpperCase()}${categoryName.slice(1)} ${
              pageIndex === 0 ? '' : `/ ${pageIndex}`
            }`
          }}
        </div>
      </header>
      <main>
        <div v-if="hasPrev" class="pageNavContainer prev">
          <div class="pageNav"><span>/// Prev</span></div>
          <NuxtLink :to="prevLink"></NuxtLink>
        </div>
        <ArticleIndexItem
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
        <div v-if="hasNext" class="pageNavContainer next">
          <div class="pageNav"><span>Next ///</span></div>
          <NuxtLink :to="nextLink"></NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  .content {
    margin: 1rem 1rem 2rem 1rem;
    padding: 1rem;
    font-size: small;
    background-color: white;
    p {
      margin-top: 1rem;
      &:nth-child(1) {
        margin-top: 0;
      }
    }
  }
  .categoryTitle {
    margin: 1.5rem 0;
    padding: 1rem;
    background-color: white;
    font-size: large;
    font-weight: 700;
  }
}
.pageNavContainer {
  position: relative;
  width: 100%;
  display: flex;
  .pageNav {
    width: 300px;
    padding: 1rem;
    margin: 1rem 1rem;
    border: 1px solid black;
    span {
      font-weight: 800;
      padding: 0 1rem;
      background-color: white;
    }
  }
  &.next {
    justify-content: flex-end;
    text-align: right;
    .pageNav {
      margin-top: 0;
    }
  }
  a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
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
import { getSourceKind, Article } from '@/scripts/article'

const useConfig = wrapProperty('$config', false)

export default defineComponent({
  setup(_props, _context) {
    const route = useRoute()
    const config = useConfig()
    const { $axios } = useContext()

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
    const hasPrev = computed(() => pageIndex.value > 0)
    const hasNext = computed(
      () =>
        articlesTotalCount.value > articlesOffset.value + config.ITEMS_PER_PAGE
    )

    const category = ref<Category>()
    const categoryName = computed(() => route.value.params.category)

    const prevLink = computed(
      () =>
        (categoryName.value ? `/category/${categoryName.value}/` : '/') +
        (pageIndex.value < 1 ? `${pageIndex.value - 1}` : '')
    )
    const nextLink = computed(
      () =>
        (categoryName.value ? `/category/${categoryName.value}/` : '/') +
        `${pageIndex.value + 1}`
    )

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
          }))
        )
      }
    })
    return {
      articles,
      pageIndex,
      hasPrev,
      hasNext,
      prevLink,
      nextLink,
      categoryName,
    }
  },
})
</script>
