<template>
  <div
    class="
      bg-yellow-50
      text-yellow-900
      py-5
      px-8
      border border-solid border-yellow-100
      text-base
      hint-container
    "
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Hint',
}
</script>
<style lang="scss">
.hint-container {
  a {
    font-weight: 500;
  }
}
</style>
