/* eslint-disable vue/no-v-html */
<template>
  <div
    v-click-outside="externalClick"
    class="text-gray-500 text-base md:text-lg pt-4"
  >
    <div
      :class="show ? 'text-gray-900 font-medium' : ''"
      class="flex justify-between space-x-5 align-middle hover:text-gray-900 font-medium cursor-pointer"
      @click="toggle"
    >
      {{ details.title }}

      <ChevronTopIcon v-if="show" class="ml-4 mt-2" />
      <ChevronBottomIcon v-else class="ml-4 mt-2" />
    </div>
    <div
      v-show="show"
      class="mt-3 text-gray-700 pr-5 prose"
      v-html="details.description"
    />
  </div>
</template>
<script>
import vClickOutside from 'v-click-outside'
import ChevronTopIcon from '~/assets/icons/chevron-top.svg?inline'
import ChevronBottomIcon from '~/assets/icons/chevron-bottom.svg?inline'
export default {
  name: 'QuestionCard',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    ChevronTopIcon,
    ChevronBottomIcon,
  },
  props: {
    details: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      show: false,
      answer: this.details.a,
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
    externalClick() {
      if (this.show) {
        this.show = false
      }
    },
  },
}
</script>
