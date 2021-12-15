<template>
  <div :id="id" class="text-xl md:text-.5xl px-0 py-5 md:py-10 md:pb-5">
    <h3
      v-if="title !== ''"
      class="leading-normal text-default capitalize"
      :class="{ 'font-medium': titleBold, 'font-normal': !titleBold }"
    >
      {{ title }}
    </h3>
    <p class="text-base md:text-.5xl font-normal leading-normal">
      {{ subtitle }}
    </p>
    <div>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'OverviewRewards',
  props: {
    title: {
      default: null,
      type: String,
    },
    titleBold: {
      default: true,
      type: Boolean,
    },
    subtitle: {
      default: null,
      type: String,
    },
    id: {
      default: null,
      type: String,
    },
  },
}
</script>
