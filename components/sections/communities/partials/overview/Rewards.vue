<template>
  <Section :title="$t('communities.reward')" :subtitle="$t('communities.overview.subtitle')" />
</template>
<script>
import Section from './Section.vue'

export default {
  name: 'OverviewRewards',
  components: {
    Section
  }
}
</script>
