<template>
  <NuxtLink :to="`/post/${article.id}`" style="width: 48%">
    <div v-if="article.sourceDetail.thumbnail" class="recentArticle">
      <div class="thumb">
        <img :src="article.sourceDetail.thumbnail" width="100%" />
      </div>
      <div class="title">
        {{ article.title }}
      </div>
    </div>
    <div v-else class="noThumb">
      <div>{{ article.title }}</div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.recentArticle {
  position: relative;
  width: 100%;
  .thumb {
    object-fit: cover;
  }
  .title {
    position: absolute;
    bottom: 1rem;
    left: 0;
    font-size: small;
    background-color: white;
    color: black;
    font-weight: 400;
  }
}
.noThumb {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90px;
  font-size: small;
  background-color: white;
  color: black;
  font-weight: 400;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Article } from '@/scripts/article'

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(_props, _context) {
    return {}
  },
})
</script>
