<template>
  <div class="py-10">
    <p class="font-medium text-xs text-gray-600">
      SUBMISSIONS
    </p>
    <div class="py-5">
      <SubmissionCard
        v-for="(submission, i) in submissions"
        :key="submission.id"
        :stats="true"
        :link="
          `/communities/${$route.params.slug}/submissions/${submission.id}`
        "
        :submission="submission"
        :last="i === submissions.length - 1"
      />
    </div>
    <div class="py-10">
      <p class="font-medium text-xs text-gray-600">
        FEEDBACKS
      </p>
      <div class="py-5">
        <SubmissionCard
          v-for="(submission, i) in feedbacks"
          :key="submission.id"
          :stats="true"
          :link="
            `/communities/${$route.params.slug}/submissions/${submission.id}`
          "
          :submission="submission"
          :last="i === feedbacks.length - 1"
        />
      </div>
      <div class="py-5">
        <SubmissionCard
          v-for="(submission, i) in feedbacks"
          :key="submission.id"
          :stats="true"
          :link="
            `/communities/${$route.params.slug}/submissions/${submission.id}`
          "
          :submission="submission"
          :last="i === feedbacks.length - 1"
        />
      </div>
    </div>
  </div>
</template>
<script>

import SubmissionCard from '@/components/cards/Submission'

export default {
  name: 'SubmissionList',
  components: {
    // Section,
    SubmissionCard
  },
  computed: {
    submissions () {
      return [
        { user: { userId: 1, displayName: 'user1' }, text: 'AEQuiz is a web æpp that engages the audience in a unique and fun way and connects them to the learning material. It also gives immediate results to participants.' }
      ]
    },
    feedbacks () {
      return [
        { user: { userId: 1, displayName: 'user1' }, text: 'AEQuiz is a web æpp that engages the audience in a unique and fun way and connects them to the learning material. It also gives immediate results to participants.' },
        { user: { userId: 1, displayName: 'user1' }, text: 'AEQuiz is a web æpp that engages the audience in a unique and fun way and connects them to the learning material. It also gives immediate results to participants.' }
      ]
    }
  }
}
</script>
