<template>
  <div
    class="relative"
    :class="{
      'bg-white text-gray-900': type == 'default',
      'bg-primary text-white': type == 'primary',
      'bg-secondary text-gray-900': type == 'secondary',
      'bg-gray-50 text-gray-900': type == 'secondary-light',
    }"
  >
    <div class="content-wrapper" :class="[padding]">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    type: {
      default: 'default',
      type: String,
    },
    padding: {
      default: 'py-4',
      type: String,
    },
  },
}
</script>
