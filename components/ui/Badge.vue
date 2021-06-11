<template>
  <span
    :style="customStyle"
    :class="[sizeClasses]"
    class="
      badget-color
      font-semibold
      text-white
      leading-none
      text-center
      inline-flex
      items-center
      justify-center
      rounded-full
      text-xs
      absolute
    "
    >{{ value }}</span
  >
</template>

<script>
export default {
  name: 'Badge',
  props: {
    value: {
      default: 0,
      type: [Number, String],
    },
    size: {
      default: 'small',
      type: String,
    },
    customStyle: {
      default: null,
      type: Object,
    },
  },
  computed: {
    initials() {
      return this.user.displayName ? this.user.displayName[0] : null
    },
    sizeClasses() {
      switch (this.size) {
        case 'medium':
          return 'w-6 h-6 text-sm'
        default:
          return 'h-4 w-4 text-xs'
      }
    },
  },
}
</script>
