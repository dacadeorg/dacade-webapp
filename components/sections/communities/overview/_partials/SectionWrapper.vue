<template>
  <div class="py-12 flex">
    <div class="w-2/5 flex flex-col text-gray-700 space-y-2">
      <div class="font-medium text-.5xl leading-snug">{{ title }}</div>

      <div class="text-sm font-light w-3/4">
        {{ description }}
      </div>
    </div>
    <div class="w-3/5 items-center flex flex-col">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SectionWrapper',
  props: {
    title: {
      default: '',
      type: String,
    },
    description: {
      default: '',
      type: String,
    },
  },
}
</script>
