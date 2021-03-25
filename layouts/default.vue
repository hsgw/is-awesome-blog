<template>
  <div class="container">
    <div class="main">
      <Title />
      <HeaderNavigation />
      <Nuxt />
    </div>
    <footer>
      <div class="animate">
        <span class="author">
          Author: <a href="https://twitter.com/hsgw" target="_blank">hsgw</a>
        </span>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  .main {
    margin: 0 auto;
    max-width: 800px;
    z-index: 50;
  }
}
footer {
  text-align: center;
  font-size: small;
  padding: 3rem 0;
  .author {
    display: inline-block;
    width: unset;
    font-weight: 600;
    background-color: white;
    padding: 0 0.3rem;
    animation: rot 4s linear infinite;
  }
}
@keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate3d(1, -1, 1, 360deg);
  }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {},
})
</script>
