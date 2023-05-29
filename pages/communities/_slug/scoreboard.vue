<template>
  <CommunityWrapper>
    <template v-slot:sidebar>
      <ScoreboardFilter />
    </template>
    <Scoreboard />
  </CommunityWrapper>
</template>
<script>
import { mapGetters } from 'vuex'

import { getMetadataDescription, getMetadataTitle } from '~/utilities/Metadata'
import CommunityWrapper from '@/components/sections/communities/overview/Wrapper'
import Scoreboard from '@/components/sections/communities/overview/scoreboard'
import ScoreboardFilter from '@/components/sections/communities/overview/scoreboard/Filter.vue'
export default {
  components: {
    CommunityWrapper,
    Scoreboard,
    ScoreboardFilter,
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
