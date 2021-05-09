<template>
  <div>
    <Header
      hide-title-on-mobile
      :title="community.name"
      :subtitle="chapter.title"
      :description="chapter.description"
    />
    <Section
      :title="$t('communities.overview.objective.title')"
      :subtitle="`${$t('communities.chapter.objective.subtitle')}:`"
    >
      <ObjectiveList :objectives="chapter.objectives" />
    </Section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import ObjectiveList from '@/components/list/Objectives'
import Section from '../partials/Section.vue'
import Header from '../partials/Header.vue'

export default {
  name: 'ChapterHeader',
  components: {
    Section,
    ObjectiveList,
    Header
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content',
      chapter: 'communities/chapters/current'
    })
  }
}
</script>
