<template>
  <span
    :class="[sizeClasses, shapeClasses]"
    :style="{
      backgroundColor: color
    }"
    class="bg-primary inline-flex text-white  items-center justify-center uppercase leading-none"
  >
    {{ user && initials }}
    <img v-if="icon" :src="icon" class="p-2">
  </span>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    icon: {
      default: null,
      type: String
    },
    color: {
      default: null,
      type: String
    },
    user: {
      default: () => {
        return {}
      },
      type: Object
    },
    size: {
      default: 'small',
      type: String
    },
    shape: {
      default: 'circular',
      type: String
    }
  },
  computed: {
    initials () {
      return this.user.displayName ? this.user.displayName[0] : null
    },
    sizeClasses () {
      switch (this.size) {
        case 'extra':
          return 'w-32 h-32 text-4xl'
        case 'medium':
          return 'w-15 h-15 text-2xl'
        default:
          return 'w-9 h-9 text-lg'
      }
    },
    shapeClasses () {
      switch (this.shape) {
        case 'rounded':
          return 'rounded-xl'
        case 'squared':
          return 'rounded-none'
        default:
          return 'rounded-full'
      }
    }
  }
}
</script>
