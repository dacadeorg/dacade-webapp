<template>
  <div class="w-full text-center text-gray-500 py-20 text-base">
    <h1 v-if="title" class="text-3xl mb-5">{{ title }}</h1>
    <p v-if="subtitle" class="test-sm" v-html="subtitle" />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
  props: {
    title: {
      default: null,
      type: String,
    },
    subtitle: {
      default: null,
      type: String,
    },
  },
}
</script>
