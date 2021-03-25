<template>
  <div class="title">Is Awesome</div>
</template>

<style lang="scss" scoped>
.title {
  color: $bgColor;
  font-size: 48px;
  font-weight: 900;
  line-height: 48px;
  text-shadow: 0.07em 0.07em 0 rgba(0, 0, 0, 0.1);
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
