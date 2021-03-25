<template>
  <div class="container">
    <div>
      <NuxtLink v-if="hasPrev" :to="prevLink" class="link"
        ><span>&lt;&lt;&lt; Prev</span></NuxtLink
      >
    </div>
    <div v-if="state.categoryName" :style="randomRotateStyle()">
      <span class="categoryName">{{
        `#${state.categoryName}` +
        (state.pageIndex === 0 ? '' : ` / ${state.pageIndex}`)
      }}</span>
    </div>
    <div>
      <NuxtLink v-if="hasNext" :to="nextLink" class="link"
        ><span>Next >>></span></NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  .link {
    text-decoration: none;
    & > span {
      font-size: small;
      font-weight: 400;
      color: lighten(black, 10%);
      background-color: white;
      padding: 0 0.1rem;
    }
  }
  .categoryName {
    text-transform: capitalize;
    font-weight: 400;
    background-color: white;
    padding: 0 0.5rem;
  }
}
</style>

<script lang="ts">
import {
  defineComponent,
  PropType,
  computed,
  wrapProperty,
} from '@nuxtjs/composition-api'
import { randomRotateStyle } from '@/scripts/random'

const useConfig = wrapProperty('$config', false)

export default defineComponent({
  props: {
    state: {
      type: Object as PropType<{
        pageIndex: number
        categoryName: String | undefined
        articlesTotalCount: number
        articlesOffset: number
      }>,
      required: true,
    },
  },
  setup(_props, _context) {
    const config = useConfig()
    const hasPrev = computed(() => _props.state.pageIndex > 0)
    const hasNext = computed(
      () =>
        _props.state.articlesTotalCount >
        _props.state.articlesOffset + config.ITEMS_PER_PAGE
    )
    const prevLink = computed(
      () =>
        (_props.state.categoryName
          ? `/category/${_props.state.categoryName}/`
          : '/') +
        (_props.state.pageIndex - 1 !== 0
          ? `${_props.state.pageIndex - 1}`
          : '')
    )
    const nextLink = computed(
      () =>
        (_props.state.categoryName
          ? `/category/${_props.state.categoryName}/`
          : '/') + `${_props.state.pageIndex + 1}`
    )
    return { hasPrev, hasNext, prevLink, nextLink, randomRotateStyle }
  },
})
</script>
