<template>
  <div>
    <Header
      hide-title-on-mobile
      :title="course.name"
      :subtitle="learningModule.title"
      :description="learningModule.description"
    />
    <Section
      :title="$t('communities.overview.objective.title')"
      :subtitle="`${$t('communities.chapter.objective.subtitle')}:`"
      hide-subtitle-on-mobile
    >
      <ObjectiveList :objectives="learningModule.objectives" />
    </Section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import Section from '@/components/sections/communities/_partials/Section.vue'
import Header from '@/components/sections/communities/_partials/Header.vue'
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
      course: 'communities/courses/current',
      learningModule: 'communities/courses/learningModules/current',
    }),
  },
}
</script>
