<template>
  <div :class="['text-sm md:text-base', gridClasses, alignment]">
    <p class="font-medium justify-items-end leading-normal">
      {{ name }}
    </p>
    <div class="text-gray-500 col-span-2 leading-normal">
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
    },
    itemsStart: {
      default: false,
      type: Boolean,
    },
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
    },
    alignment() {
      if (!this.itemsStart) {
        return 'items-center'
      }
      return 'items-start'
    }
  },
}
</script>
