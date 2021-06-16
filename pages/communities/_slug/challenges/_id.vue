<template>
  <Section padding="py-0">
    <div class="lg:flex">
      <div class="hidden lg:block w-1/4 py-3 pr-4 lg:py-14">
        <Navigation />
      </div>
      <div class="lg:hidden py-4 w-full">
        <MobileNav />
      </div>
      <div class="lg:w-3/4">
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
          <div v-if="isAuthenticated">
            <div v-if="submission" class="mt-8">
              <h4 class="my-8 text-.5xl font-medium">
                {{ $t('communities.challenge.your-submission') }}
              </h4>
              <SubmissionCard :submission="submission" :last="true" />
            </div>
            <SubmissionForm v-else />
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Navigation from '@/components/sections/communities/Navigation'
import Section from '@/components/ui/Section'
import Header from '@/components/sections/communities/challenge/Header'
import RatingRubric from '@/components/sections/communities/challenge/Rubric'
import Rewards from '@/components/sections/communities/challenge/Rewards'
import SubmissionForm from '@/components/sections/communities/challenge/Submission'
import SubmissionCard from '@/components/cards/Submission'
import MobileNav from '@/components/sections/communities/MobileNav'

export default {
  components: {
    Navigation,
    Section,
    MobileNav,
    Header,
    RatingRubric,
    Rewards,
    SubmissionForm,
    SubmissionCard,
  },
  scrollToTop: true,
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/challenges/find', params.id)
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
