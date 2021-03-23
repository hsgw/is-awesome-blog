<template>
  <div class="container">
    <div class="thumbnail" @click="clickThumb">
      <img
        v-if="article.sourceDetail.thumbnail"
        :src="article.sourceDetail.thumbnail"
        :alt="article.title"
        width="100%"
        height="auto"
      />
      <div :class="article.sourceDetail.thumbnail ? 'title' : 'noThumb'">
        {{ article.title }}
      </div>
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
      position: absolute;
      bottom: 8%;
      background-color: white;
      font-weight: 600;
      padding-right: 0.2rem;
    }
  }
  .description {
    font-size: small;
    text-align: right;
    .category {
      text-transform: capitalize;
      font-weight: 600;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import { Article } from '@/models/cms'

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(_props, _context) {
    const router = useRouter()
    const clickThumb = () => {
      router.push(`/post/${_props.article.id}`)
    }
    return { clickThumb }
  },
})
</script>
