<template>
  <div>
    <div v-if="submissions && submissions.length" class="py-10">
      <p class="font-medium text-xs text-gray-600">SUBMISSIONS</p>
      <div class="py-5">
        <SubmissionCard
          v-for="(submission, i) in submissions"
          :key="submission.id"
          :stats="true"
          :link="`/communities/${community.slug}/submissions/${submission.id}`"
          :submission="submission"
          :last="i === submissions.length - 1"
        />
      </div>
    </div>
    <div v-if="feedbacks && feedbacks.length" class="py-10">
      <p class="font-medium text-xs text-gray-600">FEEDBACKS</p>
      <div v-for="feedback in feedbacks" :key="feedback.id" class="py-5">
        <SubmissionCard
          :stats="true"
          :link="`/communities/${community.slug}/submissions/${community.id}`"
          :submission="feedback.submission"
          :last="false"
        />
        <FeedbackCard :stats="true" :value="feedback" :last="true" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionCard from '@/components/cards/Submission'
import FeedbackCard from '@/components/cards/Feedback'

export default {
  name: 'SubmissionList',
  components: {
    // Section,
    FeedbackCard,
    SubmissionCard,
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'user/communities/current',
      feedbacks: 'user/communities/feedbacks',
      submissions: 'user/communities/submissions',
      reputation: 'user/communities/reputation',
    }),
  },
}
</script>
