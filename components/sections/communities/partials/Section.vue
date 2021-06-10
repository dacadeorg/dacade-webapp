<template>
  <div class="text-xl md:text-.5xl px-0 py-5 md:py-10 md:pb-5">
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
  },
}
</script>
