<template>
  <div class="py-12 flex flex-col lg:flex-row">
    <div
      class="w-full lg:w-3/12 xl:w-2/5 flex flex-col text-gray-700 space-y-2"
    >
      <div class="font-medium text-.5xl leading-snug">{{ title }}</div>

      <div class="text-sm font-light w-3/4 xl:w-3/4 lg:w-full lg:pr-7">
        {{ description }}
      </div>
    </div>
    <div
      class="w-full mt-5 lg:m-0 lg:w-9/12 xl:w-3/5 items-center flex flex-col"
    >
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
