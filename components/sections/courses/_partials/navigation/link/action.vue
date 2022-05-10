<template>
  <span class="relative block">
    <span
      v-if="item.subitems && item.subitems.length"
      :class="classes"
      :style="styles"
      @click="goToLink()"
    >
      <slot />
    </span>
    <nuxt-link
      v-else
      :class="classes"
      :style="styles"
      :to="localePath(item.link)"
    >
      <slot />
    </nuxt-link>
  </span>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    activeLinkStyle: {
      type: Object,
      default: () => ({}),
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: true,
    }
  },
  computed: {
    styles() {
      return this.isActive ? this.activeLinkStyle : {}
    },
    classes() {
      return [
        'relative block text-gray-500 cursor-pointer',
        { 'activable-link': this.isActive },
      ]
    },
  },
  methods: {
    goToLink() {
      this.$emit('goToLink')
    },
  },
}
</script>
