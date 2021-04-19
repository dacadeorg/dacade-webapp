<template>
<div class="rounded-3xl inline-block mt-2 bg-gray-200 text-center">
  <span class="px-2 py-0.5 text-xs">{{ value }}</span>
</div>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    value: {
      default: '',
      type: String
    }
  }
}
</script>
