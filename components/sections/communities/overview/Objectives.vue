<template>
  <Section
    :title="$t('communities.overview.objective.title')"
    :subtitle="$t('communities.overview.objective.subtitle')"
  >
    <ObjectiveList :objectives="community.objectives" />
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ObjectiveList from '@/components/list/Objectives'
import Section from '../partials/Section.vue'

export default {
  name: 'OverviewSection',
  components: {
    Section,
    ObjectiveList,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors',
    }),
  },
}
</script>
