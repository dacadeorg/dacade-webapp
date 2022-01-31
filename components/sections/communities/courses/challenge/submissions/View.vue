<template>
  <div v-if="submission">
    <SubmissionCard :submission="submission" :buttons="true" />
    <Evaluation v-if="submission.evaluation" />
    <Feedback />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionCard from '@/components/cards/Submission'
import Feedback from '@/components/sections/communities/courses/challenge/submissions/feedback'
import Evaluation from '@/components/sections/communities/courses/challenge/submissions/Evaluation'

export default {
  name: 'SubmissionView',
  components: {
    SubmissionCard,
    Feedback,
    Evaluation,
  },
  computed: {
    ...mapGetters({
      submission: 'communities/challenges/submissions/current',
    }),
  },
}
</script>
