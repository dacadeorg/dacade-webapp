<template>
  <div v-if="community">
    <CommunityStats />
    <List />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import List from '@/components/sections/profile/communities/List'
import CommunityStats from '@/components/sections/profile/communities/Stats'

export default {
  name: 'Profile',
  components: {
    List,
    CommunityStats,
  },
  layout: 'profile',
  fetch({ store, params, error }) {
    return store.dispatch('profile/communities/find', params).catch((e) => {
      console.log({e});
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'profile/communities/current',
      feedbacks: 'profile/communities/feedbacks',
      submissions: 'profile/communities/submissions',
      reputation: 'profile/communities/reputation',
    }),
  },
}
</script>
