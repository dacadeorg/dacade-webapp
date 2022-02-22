<template>
  <div>
    <div v-if="submissions && submissions.length" class="py-10">
      <p class="font-medium text-xs text-gray-600">
        {{ $t('communities.submissions.cap') }}
      </p>
      <div
        class="
          my-5
          sm:border sm:border-gray-200 sm:border-solid
          rounded-3.5xl
          relative
        "
      >
        <div class="flex flex-col divide-y">
          <SubmissionCard
            v-for="(submission, i) in submissions"
            :key="submission.id"
            :stats="true"
            :link="
              $navigation.community.submissionPath(
                submission.id,
                submission.challenge.id,
                submission.challenge.course.slug,
                community.slug
              )
            "
            :submission="submission"
            :last="i === submissions.length - 1"
          />
        </div>
      </div>
    </div>
    <div v-if="feedbacks && feedbacks.length" class="py-10">
      <p class="font-medium text-xs text-gray-600">
        {{ $t('communities.challenge.feedbacks.cap') }}
      </p>
      <div
        class="
          my-5
          sm:border sm:border-gray-200 sm:border-solid
          rounded-3.5xl
          relative
        "
      >
        <div class="flex flex-col divide-y">
          <div v-for="feedback in feedbacks" :key="feedback.id">
            <SubmissionCard
              :stats="true"
              :link="
                $navigation.community.submissionPath(
                  feedback.submission.id,
                  feedback.submission.challenge.id,
                  feedback.submission.challenge.course.slug,
                  community.slug
                )
              "
              :submission="feedback.submission"
              :last="false"
            >
              <div class="relative">
                <div class="-mx-6">
                  <FeedbackCard
                    :preview="true"
                    :value="feedback"
                    :last="true"
                  />
                </div>
              </div>
            </SubmissionCard>
          </div>
        </div>
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
