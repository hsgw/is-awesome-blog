<template>
  <div class="container">
    <div class="title">
      <div class="icon"><AtomIcon :icon="mdiShareVariant" /></div>
      <div class="text">Share</div>
    </div>
    <div class="item" @click="clickShareButton('twitter')">
      <AtomIcon :icon="mdiTwitter" />
    </div>
    <div class="item" @click="clickShareButton('facebook')">
      <AtomIcon :icon="mdiFacebook" />
    </div>
    <div class="item" @click="clickShareButton('hatena')">
      <div class="hatena">B!</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  user-select: none;
  color: black;
  display: flex;
  align-items: center;
  .title {
    display: flex;
    align-items: center;
    text-align: center;
    border: 1px solid black;
    color: black;
    height: 32px;
    margin-right: 4px;
    .icon {
      margin: 0 6px;
      width: 20px;
      height: 20px;
    }
    .text {
      padding: 0 8px 0 0;
      font-size: small;
      font-weight: 800;
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin: 0 8px;
    cursor: pointer;
  }
  .hatena {
    overflow: hidden;
    text-align: center;
    background-color: black;
    color: $bgColor;
    font-weight: 900;
    border-radius: 3px;
    width: 22px;
    height: 22px;
  }
}
</style>

<script lang="ts">
import { mdiShareVariant, mdiTwitter, mdiFacebook } from '@mdi/js'
import {
  defineComponent,
  wrapProperty,
  useRoute,
  computed,
} from '@nuxtjs/composition-api'
import AtomIcon from './AtomIcon.vue'

const useConfig = wrapProperty('$config', false)

export default defineComponent({
  components: { AtomIcon },
  props: {},
  setup(_props, _context) {
    const route = useRoute()
    const baseUrl = useConfig().BASE_URL
    const path = computed(() => baseUrl + route.value.fullPath)

    const clickShareButton = (sns: 'twitter' | 'facebook' | 'hatena') => {
      let shareUrl
      switch (sns) {
        case 'twitter':
          shareUrl = encodeURI(
            `https://twitter.com/intent/tweet?text=${document.title}&url=${path.value}`
          )
          break
        case 'facebook':
          shareUrl = encodeURI(
            `https://www.facebook.com/sharer/sharer.php?u=${path.value}`
          )
          break
        case 'hatena':
          shareUrl = encodeURI(`http://b.hatena.ne.jp/add?&url=${path.value}`)
          break
      }
      location.href = shareUrl
    }

    return {
      clickShareButton,
      mdiShareVariant,
      mdiTwitter,
      mdiFacebook,
    }
  },
  head: {},
})
</script>
