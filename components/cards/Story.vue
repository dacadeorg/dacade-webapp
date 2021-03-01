/* eslint-disable vue/no-v-html */
<template>
  <div
    v-click-outside="externalClick"
    class="absolute border border-solid boder-gray-200 bg-gray-50 rounded-full p-1 h-14 w-14 top-2/4 left-2/4 -m-7"
    :style="{
      transform: getPosition(),
    }"
    @click="toggleBubble()"
  >
    <img :src="story.icon">
    <div
      v-show="showBubble"
      class="absolute p-7 -left-4 -ml-72 w-72 bottom-0 bg-yellow-50 rounded-3.5xl rounded-br-none text-yellow-900 border border-solid border-black border-opacity-5"
    >
      <span>{{ story.content }}</span>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'StoryCard',
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    story: {
      default: () => {
        return {}
      },
      type: Object
    },
    containerSize: {
      default: 0,
      type: Number
    },
    position: {
      default: 0,
      type: Number
    },
    gridPosition: {
      default: 0,
      type: Number
    },
    count: {
      default: 1,
      type: Number
    }
  },
  data () {
    return {
      showBubble: false
    }
  },
  methods: {
    getPosition () {
      const angle = 360 / this.count
      const rotation = angle * this.position + (25 * (this.gridPosition + 1))
      return `rotate(${rotation}deg)
        translate(${this.containerSize / 2}vh)
        rotate(-${rotation}deg)`
    },
    toggleBubble () {
      this.showBubble = true
      this.$emit('show-bubble')
    },
    externalClick (event) {
      if (this.showBubble) {
        this.$emit('hide-bubble')
        this.showBubble = false
      }
    }
  }
}
</script>
