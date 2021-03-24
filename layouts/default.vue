<template>
  <div class="container">
    <GlobalNavigation id="globalNav" />
    <div class="main">
      <HeaderNavigation id="headerNav" />
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  .globalNav {
    z-index: 100;
  }
  .main {
    max-width: 800px;
    z-index: 50;
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
