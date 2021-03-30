<template>
  <Section padding="py-0">
    <div class="flex">
      <div class="w-1/4 py-14">
        <Navigation />
      </div>
      <div class="w-3/4">
        <div class="py-4 flex flex-col space-y-8 text-gray-700">
          <Header
            :title="community.name"
            :subtitle="$t('communities.submission.title')"
          />
          <div v-if="submission">
            <SubmissionCard :submission="submission" :buttons="true" />
            <EvaluationCard
              v-for="(evaluation, i) in submission.evaluations"
              :key="i"
              :evaluation="evaluation"
            />
            <ReviewCard
              v-for="(feedback, k) in submission.feedbacks"
              :key="feedback.id"
              :review="feedback"
              :last="k === submission.feedbacks.length - 1"
            />
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'
import SubmissionCard from '@/components/cards/Submission'
import ReviewCard from '@/components/cards/Review'
import EvaluationCard from '@/components/cards/Evaluation'
import Navigation from '@/components/sections/communities/Navigation'
import Section from '@/components/ui/Section'
import Header from '@/components/sections/communities/partials/Header'

export default {
  components: {
    Navigation,
    Section,
    Header,
    SubmissionCard,
    ReviewCard,
    EvaluationCard
  },
  scrollToTop: true,
  async fetch ({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/content', params.slug)
    await store.dispatch('communities/submissions/find', {
      communitySlug: params.slug,
      id: params.id
    })
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      community: 'communities/current',
      submission: 'communities/submissions/current'
    })
  }
}
</script>
