<template>
  <div :class="['grid  text-sm md:text-base items-center', `grid-cols-${columns}`]">
    <p class="font-medium justify-items-end leading-none">
      {{ name }}
    </p>
    <div class="text-gray-500 col-span-2 leading-none">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementViewItem',
  props: {
    name: {
      default: null,
      type: String,
    },
    columns: {
      default: 3,
      type: Number,
    },
  },
}
</script>
