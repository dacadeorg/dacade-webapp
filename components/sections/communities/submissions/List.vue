<template>
  <div>
    <Section>
      <SubmissionCard
        v-for="(submission, i) in submissions"
        :key="submission.id"
        :preview="true"
        :link="`/communities/${$route.params.slug}/submissions/${submission.id}`"
        :submission="submission"
        :last="i === submissions.length - 1"
      />
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
    SubmissionCard,
  },
  computed: {
    ...mapGetters({
      submissions: 'communities/submissions/list',
    }),
  },
}
</script>
