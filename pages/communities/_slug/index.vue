<template>
  <CommunityWrapper>
    <ChallengeCard />
    <div class="md:hidden">
      <div class="active md:hidden mb-7 scroll-smooth pt-5">
        <div class="font-medium text-.5xl leading-snug">Scoreboard</div>
        <div class="text-sm font-light lg:w-full lg:pr-7 pt-2">
          On the scoreboard, you can see which users have accumulated the most
          reputation by giving valuable feedback to their peers.
        </div>
      </div>
      <Scoreboard />
    </div>
  </CommunityWrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import ChallengeCard from '@/components/cards/challenge/Challenge.vue'
import Scoreboard from '@/components/sections/communities/overview/scoreboard/index'
import { getMetadataDescription, getMetadataTitle } from '~/utilities/Metadata'
import CommunityWrapper from '@/components/sections/communities/overview/Wrapper'

export default {
  components: {
    CommunityWrapper,
    ChallengeCard,
    Scoreboard,
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
