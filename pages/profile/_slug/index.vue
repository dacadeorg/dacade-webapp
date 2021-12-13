<template>
  <Wrapper>
    <div v-if="community">
      <CommunityStats />
      <List />
    </div>
  </Wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import Wrapper from '@/components/sections/profile/Wrapper'
import List from '@/components/sections/profile/communities/List'
import CommunityStats from '@/components/sections/profile/communities/Stats'

export default {
  name: 'Profile',
  components: {
    List,
    Wrapper,
    CommunityStats,
  },
  fetch({ store, params, error }) {
    return store.dispatch('user/communities/find', params.slug).catch((e) => {
      error(e)
    })
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
