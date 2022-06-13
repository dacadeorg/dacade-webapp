<template>
  <div v-if="submission">
    <SubmissionViewCard :submission="submission" @click="$emit('translateSubmission')" />
    <Evaluation v-if="submission.evaluation" />
    <Feedback />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionViewCard from '@/components/cards/SubmissionView'
import Feedback from '@/components/sections/feedbacks'
import Evaluation from '@/components/sections/submissions/Evaluation'

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
