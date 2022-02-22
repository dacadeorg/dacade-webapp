<template>
  <div v-if="submission">
    <SubmissionViewCard :submission="submission" />
    <Evaluation v-if="submission.evaluation" />
    <Feedback />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionViewCard from '@/components/cards/SubmissionView'
import Feedback from '@/components/sections/communities/courses/challenge/submissions/feedback'
import Evaluation from '@/components/sections/communities/courses/challenge/submissions/Evaluation'

export default {
  name: 'SubmissionView',
  components: {
    SubmissionViewCard,
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
