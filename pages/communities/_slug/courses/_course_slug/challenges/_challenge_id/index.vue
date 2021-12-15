<template>
  <Wrapper>
    <div
      class="
        py-4
        flex flex-col
        divide-y divide-solid divide-gray-200
        space-y-8
        text-gray-700
      "
    >
      <Header />
      <Rewards />
      <RatingRubric :rating-criteria="challenge.ratingCriteria" />
      <BestSubmissions />
      <div v-if="isAuthenticated">
        <div v-if="submission" class="mt-8">
          <h4 class="my-8 text-.5xl font-medium">
            {{ $t('communities.challenge.your-submission') }}
          </h4>
          <SubmissionCard
            :submission="submission"
            :last="true"
            :buttons="true"
          />
        </div>
        <SubmissionForm v-else />
      </div>
    </div>
  </Wrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/sections/communities/courses/challenge/Header'
import RatingRubric from '@/components/sections/communities/courses/challenge/Rubric'
import Rewards from '@/components/sections/communities/courses/challenge/Rewards'
import SubmissionForm from '@/components/sections/communities/courses/challenge/Submission'
import SubmissionCard from '@/components/cards/Submission'
import Wrapper from '@/components/sections/communities/courses/Wrapper'
import BestSubmissions from '@/components/sections/communities/courses/challenge/submissions/BestSubmissions'

export default {
  components: {
    Wrapper,
    Header,
    RatingRubric,
    Rewards,
    SubmissionForm,
    SubmissionCard,
    BestSubmissions,
  },
  scrollToTop: true,
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/find', params.course_slug),
      store.dispatch('communities/challenges/find', params.challenge_id),
    ]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      challenge: 'communities/challenges/current',
      submission: 'communities/challenges/submission',
      isAuthenticated: 'auth/check',
    }),
    activeLinkStyle() {
      return {
        color: this.colors.textAccent,
      }
    },
  },
}
</script>
