<template>
  <span>{{ processedString }}</span>
</template>

<script>
export default {
  name: 'NoHtml',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    processedString() {
      return this.value.replace(/(<([^>]+)>)/gi, '')
    },
  },
}
</script>
