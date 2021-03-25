<template>
  <div class="container" :style="randomRotateStyle()">
    <div class="thumbnail">
      <img
        v-if="article.sourceDetail.thumbnail"
        :src="article.sourceDetail.thumbnail"
        :alt="article.title"
        width="320px"
        height="180px"
      />
      <div
        :class="article.sourceDetail.thumbnail ? 'title' : 'noThumb'"
        class="serif"
      >
        {{ article.title }}
      </div>
      <NuxtLink :to="`/post/${article.id}`"></NuxtLink>
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
      width: 100%;
      height: auto;
    }
    .noThumb {
      padding: 1rem 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2.4rem;
      font-weight: 700;
      background-color: white;
      position: relative;
      width: 100%;
      @media screen and (min-width: 800px) {
        min-height: 400px;
        text-align: center;
      }
    }
    .title {
      font-size: larger;
      font-weight: 700;
      position: absolute;
      bottom: 10%;
      background-color: white;
      padding: 0 0.4rem;
      @media screen and (min-width: 800px) {
        font-size: xx-large;
      }
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
    padding-right: 0.5rem;
    font-size: small;
    text-align: right;

    .category {
      text-transform: capitalize;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Article } from '@/scripts/article'
import { randomRotateStyle } from '@/scripts/random'

export default defineComponent({
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
  },
  setup(_props, _context) {
    return { randomRotateStyle }
  },
})
</script>
