<template>
  <div class="relative">
    <MainHeaderSection />
    <Section>
      <div class="w-full mx-auto divide-y divide-solid divide-gray-200 mt-7">
        <div class="flex divide-y divide-solid divide-gray-200">
          <ChallengeSideBar/>
          <ChallengeCard/>
        </div>

        <Scoreboard />
        
      </div>
    </Section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import Scoreboard from '@/components/sections/communities/overview/scoreboard'
import ChallengeCard from '@/components/cards/challenge/Challenge.vue'
import ChallengeSideBar from '@/components/layout/Challenge.vue'
import Section from '@/components/ui/Section'
import { getMetadataDescription, getMetadataTitle } from '~/utilities/Metadata'
export default {
  components: {
    MainHeaderSection,
    Section,
    Scoreboard,
    ChallengeSideBar,
    ChallengeCard
  },
  layout: 'community',
  scrollToTop: true,
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/all', params.slug),
      store.dispatch('communities/scoreboard/all', params.slug),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.community?.name),
      meta: getMetadataDescription(this.community?.description),
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      courses: 'communities/courses/list',
    }),
  },
}
</script>
