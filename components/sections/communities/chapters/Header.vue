<template>
  <div
    class=""
  >
    <h1 class="text-5xl leading-none text-gray-400">
      {{ community.name }}
    </h1>
    <h2 class="text-5xl leading-none text-default font-normal">
      {{ chapter.title }}
    </h2>
    <p class="my-5 text-.5xl w-10/12 leading-snug text-gray-700">
      {{ chapter.description }}
    </p>
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

export default {
  name: 'ChapterHeader',
  components: {
    Section,
    ObjectiveList
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
