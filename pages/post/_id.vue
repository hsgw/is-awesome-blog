<template>
  <main>
    <div v-if="article">
      <div class="image">
        <img
          v-if="article.sourceDetail.kind === 'normal'"
          :src="article.sourceDetail.thumbnail"
          width="320px"
          height="180px"
        />
        <Tweet
          v-else-if="article.sourceDetail.kind === 'twitter'"
          :id="article.sourceDetail.id"
          widget-class="twitter"
          ><div class="loading">
            <div class="twitterLoader">
              <AtomIcon :icon="mdiTwitter"></AtomIcon>
            </div></div
        ></Tweet>
        <Youtube
          v-else-if="article.sourceDetail.kind === 'youtube'"
          :video-id="article.sourceDetail.id"
          class="youtube"
          fitParent
          resize
          :resizeDelay="0"
          @ready="onYoutubeReady"
        ></Youtube>
      </div>
      <div class="content">
        <div class="title serif">{{ article.title }}</div>
        <div class="info">
          <div>
            <span
              v-for="category in article.categories"
              :key="category.id"
              class="category"
            >
              {{ `#${category.name}` }}
            </span>
            <span class="date">
              {{ article.publishedAt.slice(0, 10) }}
            </span>
          </div>
        </div>
        <div id="body" class="articleBody" v-html="article.body"></div>
        <div v-if="article.source" class="source">
          <div style="font-size: x-small">(引用元)</div>
          <a :href="article.source" target="_blank" rel="noreferrer">{{
            article.source
          }}</a>
        </div>
        <hr />
        <Share class="share" />
      </div>
    </div>
    <Loading :loading="isLoading" />
  </main>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.hide {
  position: fixed;
  z-index: 50;
  background-color: $bgColor;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
main {
  overflow: hidden;
  width: 100%;
  position: relative;
  z-index: 25;
  margin: 1rem 0 2rem 0;
  .image {
    img {
      width: 100%;
      height: auto;
    }
    .youtube {
      width: 100%;
    }
    .twitter {
      .loading {
        height: 400px;
        .twitterLoader {
          color: grey;
          width: 100px;
          height: 100px;
          animation: twitter 1s ease-in infinite;
        }
      }
    }
  }
  .content {
    padding: 1rem 0.5rem 0 0.5rem;
    .title {
      font-size: larger;
      font-weight: 500;
    }
    .info {
      margin-bottom: 1.5rem;
      font-size: small;
      color: grey;
      .category {
        text-transform: capitalize;
        padding-right: 0.5rem;
      }
    }
    .source {
      word-break: break-all;
      font-size: small;
      margin-bottom: 0.5rem;
    }
  }
}
hr {
  border-top: 1px solid grey;
}
.share {
  justify-content: flex-end;
  margin-right: 0.5rem;
}
@keyframes twitter {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
.articleBody {
  p {
    margin-bottom: 1.5rem;
  }
  blockquote {
    color: grey;
    font-size: small;
    padding: 0 0 0 0.5rem;
    margin-bottom: 2rem;
    border-left: 3px solid grey;
  }
}
</style>

<script lang="ts">
import { mdiTwitter } from '@mdi/js'
import { Tweet } from 'vue-tweet-embed'
import { Youtube } from 'vue-youtube'
import {
  defineComponent,
  useMeta,
  useRoute,
  useFetch,
  useContext,
  ref,
  wrapProperty,
  computed,
} from '@nuxtjs/composition-api'
import { ArticleResultItem } from '@/scripts/cms'
import { getSourceKind, Article } from '@/scripts/article'

const useConfig = wrapProperty('$config', false)

export default defineComponent({
  components: { Tweet, Youtube },
  props: {},
  setup(_props, _context) {
    const config = useConfig()
    const route = useRoute()
    const { $axios } = useContext()

    const article = ref<Article>()
    const isLoading = ref(true)
    const id = computed(() => route.value.params.id)
    const path = computed(() => route.value.fullPath)
    const title = computed(() => article.value?.title ?? '')
    const body = computed(() =>
      article.value?.body
        ? article.value.body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
        : ''
    )
    const thumbnail = computed(
      () => article.value?.sourceDetail.thumbnail ?? ''
    )

    useMeta(() => ({
      title: article.value?.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title.value + ' is Awesome',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: body.value,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: config.BASE_URL + path.value,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: thumbnail.value,
        },
      ],
    }))

    useFetch(async () => {
      const result = await $axios.get<ArticleResultItem>(
        config.MICROCMS_API_BASE_URL + 'articles/' + id.value,
        {
          headers: {
            'X-API-KEY': config.MICROCMS_X_API_KEY,
          },
          params: {
            fields:
              'id,publishedAt,title,image,categories.name,categories.id,source,body',
          },
        }
      )
      article.value = {
        ...result.data,
        sourceDetail: getSourceKind(result.data),
      }
      if (article.value.sourceDetail.kind !== 'youtube') {
        isLoading.value = false
      }
    })

    const onYoutubeReady = () => {
      isLoading.value = false
    }
    return { mdiTwitter, article, isLoading, onYoutubeReady }
  },
  head: {},
})
</script>
