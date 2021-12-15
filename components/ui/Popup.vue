<template>
  <div
    v-if="show"
    class="fixed z-999 w-screen h-screen overflow-y-scroll top-0 left-0"
    :class="{ 'flex items-center': center }"
  >
    <div
      class="opacity-25 fixed inset-0 z-0 bg-black w-full h-screen top-0 left-0"
      @click="externalClick"
    />
    <slot />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'

export default {
  name: 'Popup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$store.dispatch('ui/toggleBodyScrolling', newValue)
      }
    },
  },
  methods: {
    externalClick(event) {
      this.$emit('close', true)
    },
  },
}
</script>
