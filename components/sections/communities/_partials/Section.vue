<template>
  <div :id="id" class="text-xl md:text-.5xl px-0 py-5 md:py-10 md:pb-5">
    <H3
      v-if="title"
      :bold="titleBold"
    >
      {{ title }}
    </H3>
    <p
      class="text-base md:text-.5xl font-normal leading-normal"
      :class="{ hidden: hideSubtitleOnMobile }"
    >
      {{ subtitle }}
    </p>
    <div>
      <slot />
    </div>
  </div>
</template>
<script>
import H3 from "~/components/ui/text/H3";
export default {
  name: 'OverviewRewards',
  components: {H3},
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
    hideSubtitleOnMobile: {
      default: false,
      type: Boolean,
    },
  },
}
</script>
