<template>
  <div>
    <Section>
      <SubmissionCard v-for="submission in submissions" :key="submission.id" :submission="submission" />
    </Section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import SubmissionCard from '@/components/cards/Submission'
// import RewardsSection from './partials/overview/Rewards'
import Section from '../partials/Section.vue'

export default {
  name: 'SubmissionList',
  components: {
    Section,
    SubmissionCard
  },
  computed: {
    ...mapGetters({
      submissions: 'communities/submissions/list'
    })
  }
}
</script>
