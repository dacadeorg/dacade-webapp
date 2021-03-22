<template>
  <div>
    <h1 class="text-5xl leading-none text-gray-400">
      {{ community.name }}
    </h1>
    <h2 class="text-5xl leading-none text-default font-normal">
      {{ $t('communities.challenge.title') }}
    </h2>
    <p class="my-5 text-.5xl w-10/12 leading-snug text-gray-700">
      {{ community.challenge.description }}
    </p>
    <Section
      :title="$t('communities.overview.objective.title')"
      :subtitle="`${$t('communities.chapter.objective.subtitle')}:`"
    >
      <ObjectiveList :objectives="community.challenge.objectives" />
    </Section>
    <div class="bg-yellow-50 text-yellow-900 py-5 px-8 border border-solid border-yellow-100 text-base">
      <span class="pr-1 font-medium">{{ $t('communities.challenge.hint') }}:</span>{{ community.challenge.hint }}
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import ObjectiveList from '@/components/list/Objectives'
import Section from '../partials/Section.vue'

export default {
  name: 'ChallengeHeader',
  components: {
    Section,
    ObjectiveList
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    })
  }
}
</script>
