<template>
  <div class="container">
    <GlobalNavigation class="header" />
    <div class="main">
      <HeaderNavigation />
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  .header {
    z-index: 100;
  }
  .main {
    z-index: 10;
    padding-top: $headerHeight;
  }
}
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {},
})
</script>
