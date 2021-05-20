<template>
  <Section padding="py-0">
    <div class="lg:flex">
      <div class="hidden lg:block w-1/4 py-3 pr-4 lg:py-14">
        <Navigation />
      </div>
      <div class="lg:hidden py-4 w-full lg:py-14">
        <MobileNav />
      </div>
      <div class="lg:w-3/4">
        <div class="py-4 flex flex-col space-y-8 text-gray-700">
          <Header
            :title="community.name"
            :subtitle="$t('communities.submission.title')"
          />
          <div v-if="submission">
            <SubmissionCard :submission="submission" :buttons="true" />
            <EvaluationCard :evaluation="evaluation">
              <RatingRubric
                v-if="submission.challenge"
                hide-title
                :rating-criteria="submission.challenge.ratingCriteria"
              />
            </EvaluationCard>
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionCard from '@/components/cards/Submission'

import RatingRubric from '@/components/sections/communities/challenge/Rubric'
import EvaluationCard from '@/components/cards/Evaluation'
import Navigation from '@/components/sections/communities/Navigation'
import Section from '@/components/ui/Section'
import Header from '@/components/sections/communities/partials/Header'
import MobileNav from '@/components/sections/communities/MobileNav'
import Feedback from '@/components/sections/communities/submissions/feedback'

export default {
  components: {
    MobileNav,
    Navigation,
    Section,
    Header,
    SubmissionCard,
    EvaluationCard,
    RatingRubric,
    Feedback,
  },
  scrollToTop: true,
  props: {
    evaluation: {
      default: () => {
        return {
          content:
            "Your website is working great, the only problem is that you didn't host it correctly on GitHub, as mentioned by your peers.",
          user: { displayName: 'Moritz Felipe' },
        }
      },
      type: Object,
    },
  },
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/submissions/find', params.id)
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      community: 'communities/current',
      submission: 'communities/submissions/current',
    }),
  },
}
</script>
