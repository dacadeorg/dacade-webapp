<template>
  <div class="h-3 w-full block rounded-lg overflow-hidden relative">
    <div
      :style="styles" :class="['h-full w-full absolute top-0 left-0 bg-gray-100  z-0', {
        'opacity-20': communityStyles,
      }]"/>
    <div
      :style="{
        width: `${percentage}%`,
        ...styles,
      }"
      class="h-full relative z-10 bg-primary transition-all"
    ></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Progress',
  props: {
    communityStyles: {
      default: false,
      type: Boolean
    },
    percentage: {
      default: 0,
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    styles() {
      if (!this.communityStyles) {
        return {}
      }
      return {
        backgroundColor: this.colors.textAccent,
      }
    },
  },
}
</script>
