<template>
  <div>
    <Header
      :title="course.name"
      :subtitle="$t('communities.challenge.title')"
      :description="challenge.description"
    />
    <Section>
      <ObjectiveList :objectives="challenge.objectives" />
    </Section>
    <Hint>
      <span class="pr-1 font-medium"
        >{{ $t('communities.challenge.hint') }}:</span
      >
      <span v-html="challenge.hint" />
    </Hint>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import Section from '@/components/sections/communities/_partials/Section.vue'
import Header from '@/components/sections/communities/_partials/Header.vue'
import ObjectiveList from '@/components/list/Objectives'
import Hint from '@/components/ui/Hint'

export default {
  name: 'ChallengeHeader',
  components: {
    Section,
    Header,
    ObjectiveList,
    Hint,
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
      challenge: 'communities/challenges/current',
    }),
  },
}
</script>
