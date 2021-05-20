<template>
  <CommunityWrapper>
    <div v-if="community">
      <div class="bg-gray-100 sm:flex sm:justify-between rounded-3xl lg:max-w-lg">
        <div class="relative flex sm:flex-row">
          <div class="absolute sm:relative -bottom-20 right-6 sm:-right-3 md:-right-2  sm:-bottom-7  w-15 h-15 rounded-lg md:ml-5 p-2 bg-primary align-middle">
            <img :src="community.icon">
          </div>
          <div class="py-7 px-10 sm:px-7 md:px-0 md:pl-7">
            <div class="text-lg font-medium text-gray-800 pb-2">
              {{ community.name }}
            </div>
            <Tag value="45 REP" />
          </div>
        </div>
        <div class="p-7 md:text-right justify-self-stretch space-y-2">
          <div class="whitespace-nowrap">
            <span class="font-bold">4</span>
            Feedbacks
          </div>
          <div class="whitespace-nowrap">
            <span class="font-bold">1</span>
            Submission
          </div>
        </div>
      </div>
      <List />
    </div>
  </CommunityWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import CommunityWrapper from '@/components/sections/profile/CommunityWrapper'
import Tag from '@/components/ui/Tag'
import List from '@/components/sections/profile/communities/List'

export default {
  name: 'Profile',
  components: {
    List,
    CommunityWrapper,
    Tag
  },
  async fetch ({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/content', params.slug)
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current'
    })
  }
}
</script>
