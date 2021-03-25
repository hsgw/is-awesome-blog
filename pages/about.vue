<template>
  <main>
    <div class="content">
      <p>
        私がみつけたものの引用と転載が主です<br />
        何か問題があれば<a href="https://twitter.com/hsgw">Twitter</a
        >へご連絡下さい
      </p>
      <p>
        このサイトはnuxtとmicroCMSで出来ています<br />ソースコードは<a
          href="https://github.com/hsgw/is-awesome-blog"
          >こちら</a
        ><br />
      </p>
      <p>ホスティングとビルドはVercelです</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  .content {
    width: calc(100% - 2rem);
    margin: 1rem 1rem 2rem 1rem;
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
}
</style>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {},
  setup(_props, _context) {
    return {}
  },
})
</script>
