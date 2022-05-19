<template>
  <span class="dac-skeleton__root">
    <component
      :is="as"
      v-for="i in iterations"
      :key="i"
      :style="styles"
      :class="classes"
      ><slot />
    </component>
  </span>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    as: {
      default: 'span',
      type: String,
    },
    className: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    circle: {
      default: false,
      type: Boolean,
    },
    pill: {
      default: false,
      type: Boolean,
    },
    duration: {
      default: '1s',
      type: String,
    },
    width: {
      default: null,
      type: String,
    },
    height: {
      default: null,
      type: String,
    },
    minWidth: {
      default: null,
      type: String,
    },
    minHeight: {
      default: null,
      type: String,
    },
    count: {
      default: 1,
      type: Number,
    },
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default
    },
    isLoading() {
      if (this.loading) return true

      return !this.hasDefaultSlot
    },
    loadingStyles() {
      return {
        animation: `dac-skeleton-loading ${this.duration} linear infinite alternate`,
      }
    },
    styles() {
      const list = []
      if (!this.isLoading) return {}
      if (this.width) {
        list.push({
          width: this.width,
        })
      }
      if (this.height) {
        list.push({
          height: this.height,
        })
      }
      if (this.minWidth) {
        list.push({
          minWidth: this.minWidth,
        })
      }
      if (this.minHeight) {
        list.push({
          minHeight: this.minHeight,
        })
      }
      return [this.loadingStyles, ...list]
    },
    classes() {
      if (!this.isLoading) return {}
      return [
        'dac-skeleton',
        'overflow-hidden',
        'dac-skeleton--loading',
        this.className,
        { 'rounded-full': this.circle || this.pill },
      ]
    },
    iterations() {
      if (!this.isLoading || !this.count) return 1
      return this.count
    },
  },
}
</script>
<style lang="scss">
.dac-skeleton {
  max-width: 100%;
  &--loading {
    color: transparent !important;
    white-space: nowrap;
    & > * {
      opacity: 0;
    }
  }
  // &__root {
  //   line-height: inherit;
  // }
}
@keyframes dac-skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
</style>

<style lang="scss" scoped>
span.dac-skeleton {
  display: inline-block;
}
</style>
