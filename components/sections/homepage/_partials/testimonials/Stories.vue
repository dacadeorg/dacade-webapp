/* eslint-disable vue/no-v-html */
<template>
  <div
    class="relative w-full top-0 h-screen left-0 z-0 hidden md:block md:max-h-3xl lg:max-h-4xl xl:max-h-7.1xl"
  >
    <span
      v-for="(grid, i) in grids"
      :key="i"
      class="border border-solid border-gray-200 m-auto rounded-full absolute inset-0 xl:max-w-6xl xl:max-h-6xl md:max-h-.5xl md:max-w-.5xl lg:max-w-3xl lg:max-h-3xl"
      :style="{
        width: `${getSize(i)}vh`,
        height: `${getSize(i)}vh`,
        zIndex: showingBubble.grid === i ? 99 : grids.length - i,
      }"
    >
      <Story
        v-for="(story, k) in grid"
        :key="k"
        :story="story"
        :position="k"
        :count="grid.length"
        :grid-position="i"
        @show-bubble="onBubbleShow(k, i)"
        @hide-bubble="onBubbleHide(k, i)"
      />
    </span>
  </div>
</template>

<script>
import LodashChunk from 'lodash.chunk'
import Story from '@/components/cards/Story'

export default {
  name: 'TestimonialsSection',
  components: {
    // Button
    Story,
  },
  props: {
    list: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      gridSize: 90,
      maxGridSize: 802,
      showingBubble: {
        card: null,
        grid: null,
      },
      positions: [
        {
          left: 'calc(50% - 28px)',
          top: 'calc(0% - 28px)',
        },
        {
          left: 'calc(0% - 28px)',
          top: '33.33333%',
        },
        {
          right: 'calc(0% - 28px)',
          top: '33.33333%',
        },
        {
          left: 'calc(0% - 28px)',
          top: '70%',
        },
        {
          right: 'calc(0% - 28px)',
          top: '70%',
        },
      ],
    }
  },
  computed: {
    grids() {
      return LodashChunk(this.list, 5)
    },
  },
  methods: {
    getSize(i) {
      return (this.gridSize * (i + 1)) / this.grids.length
    },
    onBubbleHide(card, grid) {
      if (
        this.showingBubble.grid === grid &&
        this.showingBubble.card === card
      ) {
        this.showingBubble = {
          card: null,
          grid: null,
        }
      }
    },
    onBubbleShow(card, grid) {
      // this.showingBubble = {
      //   card,
      //   grid,
      // }
    },
  },
}
</script>
