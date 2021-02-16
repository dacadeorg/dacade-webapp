<template>
  <span class="w-9 h-9 bg-primary inline-flex text-white  items-center justify-center rounded-full text-lg uppercase">
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
    }
  },
  computed: {
    initials () {
      return this.user.displayName ? this.user.displayName[0] : null
    }
  }
}
</script>
