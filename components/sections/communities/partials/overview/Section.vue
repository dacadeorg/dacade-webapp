<template>
  <div class="text-.5xl py-12">
    <h3 class="leading-loose text-default capitalize" :class="{'font-medium': titleBold, 'font-normal': !titleBold}">
      {{ title }}
    </h3>
    <p class="font-normal leading-loose">
      {{ subtitle }}
    </p>
    <div>
      <slot />
    </div>
  </div>
</template>
<script>
// import Section from '../../ui/Section.vue'

export default {
  name: 'OverviewRewards',
  props: {
    title: {
      default: null,
      type: String
    },
    titleBold: {
      default: true,
      type: Boolean
    },
    subtitle: {
      default: null,
      type: String
    }
  }
}
</script>
