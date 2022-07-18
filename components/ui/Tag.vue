<template>
  <div
    class="text-center px-2 p-0.5 h-5 inline-flex items-center"
    :class="{
      'bg-transparent bg-opacity-25 text-white': type == 'transparent',
      'bg-gray-200 text-gray-500': type == 'gray',
      'bg-gray-100 text-gray-500': type == 'light-gray',
      'bg-yellow-100 text-yellow-900': type == 'warn',
      'rounded-full': rounded,
      'rounded': !rounded,
    }"
  >
    <span class="text-xs font-medium block leading-none">
      <span v-if="value">{{ value }}</span>
      <slot v-else/>
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
    rounded: {
      default: true,
      type: Boolean,
    }
  },
}
</script>
