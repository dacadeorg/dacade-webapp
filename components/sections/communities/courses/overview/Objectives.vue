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
import Section from '@/components/sections/communities/partials/Section.vue'
import ObjectiveList from '@/components/list/Objectives'

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
