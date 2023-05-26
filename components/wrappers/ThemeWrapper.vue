<template>
  <div :style="cssVars">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ThemeWrapper',
  props: {
    colors: {
      default: null,
      type: Object,
    },
  },
  computed: {
    cssVars() {
      return {
        '--tm-cover': this.colors.cover?.background || this.colors.primary,
        '--tm-cover-text': this.colors.cover?.text || this.colors.text,
        '--tm-primary': this.colors.primary,
        '--tm-secondary': this.colors.secondary,
        '--tm-text': this.colors.text,
        '--tm-highlight': this.colors.highlight,
        '--tm-accent': this.colors.accent,
        '--tm-muted': this.colors.muted,
      }
    },
  },
}
</script>
