<template>
  <div>
    <transition name="fade" mode="">
      <div v-if="loading" class="container">
        <div class="loader loader--style5" title="4">
          <svg
            id="Layer_1"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="72px"
            height="90px"
            viewBox="0 0 24 30"
            style="enable-background: new 0 0 50 50"
            xml:space="preserve"
          >
            <rect x="0" y="0" width="2" height="10" fill="#333">
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="translate"
                values="0 0; 0 20; 0 0"
                begin="0"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="10" y="0" width="2" height="10" fill="#333">
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="translate"
                values="0 0; 0 20; 0 0"
                begin="0.2s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
            <rect x="20" y="0" width="2" height="10" fill="#333">
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="translate"
                values="0 0; 0 20; 0 0"
                begin="0.4s"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  background-color: $bgColor;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.loader {
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em auto;
  display: inline-block;
  vertical-align: top;
}
svg path,
svg rect {
  fill: grey;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
    },
  },
  setup(_props, _context) {
    return {}
  },
})
</script>
