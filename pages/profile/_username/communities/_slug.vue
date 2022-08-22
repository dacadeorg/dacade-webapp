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
import {getMetadataDescription, getMetadataTitle} from "~/utilities/Metadata";

export default {
  name: 'Profile',
  components: {
    List,
    CommunityStats,
  },
  layout: 'profile',
  fetch({ store, params, error }) {
    return store.dispatch('profile/communities/find', params).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.community?.name, this.$route?.params?.username),
      meta: getMetadataDescription(this.community?.description)
    }
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
