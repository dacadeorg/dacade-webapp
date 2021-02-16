<template>
  <span class="bg-gray-900 text-white leading-4 h-4 w-4 text-center block rounded-full text-xs absolute top-0 -right-1">{{ value }}</span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    value: {
      default: 0,
      type: Number
    }
  }
}
</script>
