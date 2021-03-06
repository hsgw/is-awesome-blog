<template>
  <div class="headerNav">
    <div class="item"><NuxtLink to="/">Top</NuxtLink></div>
    <div class="item"><NuxtLink to="/about">about</NuxtLink></div>
    <div v-for="category in categories" :key="category.id" class="item">
      <NuxtLink :to="'/category/' + category.name">{{
        `#${category.name}`
      }}</NuxtLink>
    </div>
    <div class="item"><a href="/rss.xml">rss</a></div>
  </div>
</template>

<style lang="scss" scoped>
.headerNav {
  display: flex;
  padding: 0.5rem 0;
  overflow-x: auto;
  .item {
    text-transform: capitalize;
    font-size: small;
    font-weight: 500;
    padding: 0.2rem 0.4rem;
    text-decoration: underline;
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  wrapProperty,
  useContext,
} from '@nuxtjs/composition-api'
import { Category, CategoryResult } from '@/scripts/cms'

const useConfig = wrapProperty('$config', false)

export default defineComponent({
  props: {},
  setup(_props, _context) {
    const config = useConfig()
    const { $axios } = useContext()
    const categories = ref<Category[]>([])

    useFetch(async () => {
      const result = await $axios.get<CategoryResult>(
        config.MICROCMS_API_BASE_URL + 'categories',
        {
          headers: { 'X-API-KEY': config.MICROCMS_X_API_KEY },
          params: {
            limit: 100,
            fields: 'id,name',
          },
        }
      )
      categories.value = result.data.contents
        .map(({ name, id }: { name: string; id: string }) => ({ name, id }))
        .sort(
          (a: { name: string; id: string }, b: { name: string; id: string }) =>
            a.name > b.name ? 1 : -1
        )
    })
    return { categories }
  },
})
</script>
