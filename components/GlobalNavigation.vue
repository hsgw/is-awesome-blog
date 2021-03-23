<template>
  <div class="globalNavContainer">
    <div class="globalNav">header</div>
  </div>
</template>

<style lang="scss" scoped>
.globalNavContainer {
  position: relative;
  width: 100%;
  .globalNav {
    height: $headerHeight;
    position: fixed;
    top: 1rem;
    right: 1rem;
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
