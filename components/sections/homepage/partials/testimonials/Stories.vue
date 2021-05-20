/* eslint-disable vue/no-v-html */
<template>
  <div
    class="absolute w-full left-0 z-0"
    :style="{
      top: '-3vh',
      height: `${gridSize}vh`,
    }"
  >
    <span
      v-for="(grid, i) in grids"
      :key="i"
      class="
        border border-solid
        boder-gray-200
        m-auto
        rounded-full
        absolute
        inset-0
      "
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
        :container-size="getSize(i)"
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
import Story from '@/components/cards/Story'
import LodashChunk from 'lodash.chunk'

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
      this.showingBubble = {
        card,
        grid,
      }
    },
  },
}
</script>
