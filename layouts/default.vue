<template>
  <div class="container">
    <div class="main">
      <Title />
      <HeaderNavigation id="headerNav" />
      <Nuxt />
    </div>
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
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {},
})
</script>
