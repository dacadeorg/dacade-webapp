<template>
  <div class="relative w-full h-full">
    <slot></slot>
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('ui/unlockBodyScrolling')
  },
}
</script>
