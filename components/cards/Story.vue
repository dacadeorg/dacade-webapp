/* eslint-disable vue/no-v-html */
<template>
  <div
    v-click-outside="externalClick"
    class="
      absolute
      border border-solid border-gray-200
      bg-gray-50
      rounded-full
      p-1
      top-2/4
      left-2/4
      -m-7
      flex flex-row-reverse
    "
    :style="{
      transform: getPosition(),
    }"
    @click="toggleBubble()"
  >
    <img class="object-cover h-14 w-14 rounded-full" :src="story.icon" />
    <div
      v-show="showBubble"
      :v-if="content"
      class="
        absolute
        p-4
        md:p-7
        left-6
        md:-left-9
        -ml-2
        -mt-5
        md:ml-20 md:w-72
        w-48
        -bottom-60
        md:bottom-16
        bg-yellow-50
        rounded-3.5xl rounded-tl-none
        md:rounded-tl-3.5xl md:rounded-bl-none
        text-yellow-900
        border border-solid border-black border-opacity-5
      "
    >
      <span>{{ content }}</span>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
export default {
  name: 'StoryCard',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    story: {
      default: () => {
        return {}
      },
      type: Object,
    },
    containerSize: {
      default: 0,
      type: Number,
    },
    position: {
      default: 0,
      type: Number,
    },
    gridPosition: {
      default: 0,
      type: Number,
    },
    count: {
      default: 1,
      type: Number,
    },
  },

  computed: {
    content() {
      return this.$props.story?.content
    },
    showBubble: {
      get() {
        return this.content?.length > 1
      },
      set(val) {
        return val?.length > 1
      },
    },
  },
  watch: {
    story() {
      this.toggleBubble()
    },
  },
  methods: {
    getPosition() {
      const angle = 360 / this.count
      const rotation = angle * this.position + 25 * (this.gridPosition + 1)
      return `rotate(${rotation}deg)
        translate(${this.containerSize / 2}vh)
        rotate(-${rotation}deg)`
    },
    toggleBubble() {
      this.showBubble = true
      this.$emit('show-bubble')
    },
    externalClick(event) {
      if (this.showBubble) {
        this.$emit('hide-bubble')
        this.showBubble = false
      }
    },
  },
}
</script>
