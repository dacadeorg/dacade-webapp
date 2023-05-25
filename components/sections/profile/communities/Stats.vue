<template>
  <div class="bg-gray-100 sm:flex sm:justify-between rounded-3xl">
    <div class="relative items-center ml-7 flex sm:flex-row">
      <Avatar
        :icon="community.icon"
        :color="color"
        size="medium"
        shape="rounded"
      />
      <div class="py-7 px-10 sm:px-7 md:px-0 md:pl-7">
        <div class="text-lg font-medium text-gray-800 pb-2">
          {{ community.name }}
        </div>
        <Tag><Currency :value="reputation" token="REP" /></Tag>
      </div>
    </div>
    <div class="p-7 md:text-right justify-self-stretch space-y-2">
      <div class="whitespace-nowrap">
        <span class="font-bold">{{ feedbacks.length }}</span>
        {{ $t('feedbacks') }}
      </div>
      <div class="whitespace-nowrap">
        <span class="font-bold">{{ submissions.length }}</span>
        {{ $t('communities.challenge.submission') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Currency from '@/components/ui/Currency'

export default {
  name: 'CommunityStats',
  components: {
    Tag,
    Avatar,
    Currency,
  },
  async fetch({ store, params }) {
    await store.dispatch('profile/communities/find', params)
  },
  computed: {
    ...mapGetters({
      community: 'profile/communities/current',
      feedbacks: 'profile/communities/feedbacks',
      submissions: 'profile/communities/submissions',
      reputation: 'profile/communities/reputation',
    }),
    color() {
      const colors = this.community?.colors
      return colors?.cover?.background || colors?.primary
    },
  },
}
</script>
