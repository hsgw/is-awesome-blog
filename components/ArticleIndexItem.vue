<template>
  <div class="container">
    <div class="thumbnail">
      <img
        v-if="article.sourceDetail.thumbnail"
        :src="article.sourceDetail.thumbnail"
        :alt="article.title"
        width="100%"
        height="auto"
      />
      <div
        :class="article.sourceDetail.thumbnail ? 'title' : 'noThumb'"
        class="fontTitle"
      >
        {{ article.title }}
      </div>
      <a :href="href"></a>
    </div>
    <div class="description">
      <span
        v-for="category in article.categories"
        :key="category.id"
        class="category"
      >
        {{ ` #${category.name}` }}
      </span>
      <span class="data">// {{ article.publishedAt.slice(0, 10) }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 1rem 0 3rem 0;
  .thumbnail {
    z-index: 10;
    position: relative;
    img {
      z-index: 15;
      margin: 0;
    }
    .noThumb {
      padding: 1rem 0;
      font-size: 2.4rem;
      font-weight: 800;
      background-color: white;
      position: relative;
      width: 100%;
    }
    .title {
      font-size: larger;
      position: absolute;
      bottom: 10%;
      background-color: white;
      padding-right: 0.4rem;
    }
    & > a {
      cursor: pointer;
      position: absolute;
      z-index: 19;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &:hover {
        background-color: inherit;
      }
    }
  }
  .description {
    font-size: small;
    text-align: right;

    .category {
      text-transform: capitalize;
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'
import { Article } from '@/models/article'

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(_props, _context) {
    const href = computed(() => `/post/${_props.article.id}`)
    return { href }
  },
})
</script>
