<template>
  <div class="text-.5xl py-14">
    <h3 class="font-medium leading-loose">
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
    subtitle: {
      default: null,
      type: String
    }
  }
}
</script>
