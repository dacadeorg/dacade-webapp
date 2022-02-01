<template>
  <div
    class="rounded-full inline-block mt-2 text-center"
    :class="{
      'bg-transparent bg-opacity-25 text-white': type == 'transparent',
      'bg-gray-200 text-gray-500': type == 'gray',
      'bg-gray-100 text-gray-500': type == 'light-gray',
    }"
  >
    <span class="px-2 py-0.5 text-xs font-medium">
      <span v-if="value">{{ value }}</span>
      <slot v-else />
    </span>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    value: {
      default: '',
      type: String,
    },
    type: {
      default: 'gray',
      type: String,
    },
  },
}
</script>
