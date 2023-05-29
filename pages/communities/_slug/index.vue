<template>
  <CommunityWrapper>
    <ChallengeCard />
  </CommunityWrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import ChallengeCard from '@/components/cards/challenge/Challenge.vue'
import { getMetadataDescription, getMetadataTitle } from '~/utilities/Metadata'
import CommunityWrapper from '@/components/sections/communities/overview/Wrapper'
export default {
  components: {
    CommunityWrapper,
    ChallengeCard,
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
