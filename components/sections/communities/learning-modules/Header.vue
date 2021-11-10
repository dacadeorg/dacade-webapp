<template>
  <div>
    <Header
      hide-title-on-mobile
      :title="community.name"
      :subtitle="learningModule.title"
      :description="learningModule.description"
    />
    <Section
      :title="$t('communities.overview.objective.title')"
      :subtitle="`${$t('communities.chapter.objective.subtitle')}:`"
    >
      <ObjectiveList :objectives="learningModule.objectives" />
    </Section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import Section from '../partials/Section.vue'
import Header from '../partials/Header.vue'
import ObjectiveList from '@/components/list/Objectives'

export default {
  name: 'LearningModuleHeader',
  components: {
    Section,
    ObjectiveList,
    Header,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content',
      learningModule: 'communities/learningModules/current',
    }),
  },
}
</script>
