<template>
  <div class="flex flex-col justify-center content-wrapper">
    <h1 class="text-4xl sm:text-5xl pt-10 md:pt-20 pb-10">
      {{ $t('nav.communities') }}
    </h1>
    <div v-if="communities" class="row w-full">
      <div
        v-for="community in communities"
        :key="community.key"
        class="flex pb-4"
      >
        <CommunityListCard :community="community" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommunityListCard from '@/components/cards/community/List'
import { getMetadataTitle } from '~/utilities/Metadata'

export default {
  components: {
    CommunityListCard,
  },
  fetch({ store, error }) {
    return store.dispatch('communities/all').catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.$t('nav.communities')),
    }
  },
  computed: {
    ...mapGetters({
      communities: 'communities/list',
    }),
  },
}
</script>
