<template>
  <div :class="['text-sm md:text-base items-center', gridClasses]">
    <p class="font-medium justify-items-end leading-none">
      {{ name }}
    </p>
    <div class="text-gray-500 col-span-2 leading-none">
      <slot/>
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
    mobileBlock: {
      default: false,
      type: Boolean,
    }
  },
  computed: {
    gridClasses() {
      if (!this.mobileBlock) {
        return [
          'grid',
          `grid-cols-${this.columns}`,
        ]
      }
      return [
        'grid',
        `grid-cols-1 md:grid-cols-${this.columns}`,
        'gap-y-3 md:gap-y-0',
      ]
    }
  },
}
</script>
