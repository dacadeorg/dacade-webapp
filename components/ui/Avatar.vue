<template>
  <span
    :class="[sizeClasses]"
    class="bg-primary inline-flex text-white  items-center justify-center rounded-full uppercase leading-none"
  >
    {{ initials }}
  </span>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      default: () => {},
      type: Object
    },
    size: {
      default: 'small',
      type: String
    }
  },
  computed: {
    initials () {
      return this.user.displayName ? this.user.displayName[0] : null
    },
    sizeClasses () {
      switch (this.size) {
        case 'medium':
          return 'w-15 h-15 text-2xl'
        default:
          return 'w-9 h-9 text-lg'
      }
    }
  }
}
</script>
