<template>
  <div
    class="rounded-full text-center px-2 p-0.5 h-5 flex items-center mx-1"
    :class="{
      'bg-transparent bg-opacity-25 text-white': type == 'transparent',
      'bg-gray-200 text-gray-500': type == 'gray',
      'bg-gray-100 text-gray-500': type == 'light-gray',
    }"
  >
    <span class="text-xs font-medium inline-flex leading-none">
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
