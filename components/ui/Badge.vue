<template>
  <span
    :class="{
      [sizeClasses]: sizeClasses,
      'bg-white text-gray-900': isCommunity === true,
      'text-white bg-gray-900': isCommunity === false,
    }"
    :style="customStyle"
    class="
      font-semibold
      leading-3
      text-center
      inline-flex
      items-center
      justify-center
      rounded-full
      text-xxs
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
    sizeClasses() {
      switch (this.size) {
        case 'medium':
          return 'w-6 h-6 text-sm'
        default:
          return 'h-4 w-4 text-xxs'
      }
    },
    isCommunity() {
      return this?.$route.name?.startsWith('communities-slug__')
    },
  },
}
</script>
