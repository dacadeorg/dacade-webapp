<template>
  <div>
    <Header
      :title="community.name"
      :subtitle="$t('communities.challenge.title')"
      :description="challenge.description"
    />
    <Section>
      <ObjectiveList :objectives="challenge.objectives" />
    </Section>
    <div
      class="
        bg-yellow-50
        text-yellow-900
        py-5
        px-8
        border border-solid border-yellow-100
        text-base
      "
    >
      <span class="pr-1 font-medium"
        >{{ $t('communities.challenge.hint') }}:</span
      >{{ challenge.hint }}
    </div>
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
  name: 'ChallengeHeader',
  components: {
    Section,
    Header,
    ObjectiveList,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      challenge: 'communities/challenges/current',
    }),
  },
}
</script>
