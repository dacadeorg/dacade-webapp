<template>
  <span>
    <span
      v-show="isActive"
      class="absolute inline-block top-0 -left-6 nav-icon"
    >
      <ChevronRightIcon
        :class="{
          'transform rotate-90':
            item.subitems && item.subitems.length && isActive && expanded,
        }"
        class="transition-transform duration-200"
      />
    </span>
    <span class="nav-label">{{ $t(item.label) }}</span>
  </span>
</template>

<script>
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'
export default {
  components: {
    ChevronRightIcon,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
