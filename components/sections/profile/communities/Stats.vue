<template>
  <div class="bg-gray-100 sm:flex sm:justify-between rounded-3xl lg:max-w-lg">
    <div class="relative flex sm:flex-row">
      <Avatar
        :icon="community.icon"
        :color="community.colors.primary"
        size="medium"
        shape="rounded"
      />
      <div class="py-7 px-10 sm:px-7 md:px-0 md:pl-7">
        <div class="text-lg font-medium text-gray-800 pb-2">
          {{ community.name }}
        </div>
        <Tag :value="`${reputation} REP`" />
      </div>
    </div>
    <div class="p-7 md:text-right justify-self-stretch space-y-2">
      <div class="whitespace-nowrap">
        <span class="font-bold">{{ feedbacks.length }}</span>
        Feedbacks
      </div>
      <div class="whitespace-nowrap">
        <span class="font-bold">{{ submissions.length }}</span>
        Submission
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'

export default {
  name: 'CommunityStats',
  components: {
    Tag,
    Avatar,
  },
  async fetch({ store, params }) {
    await store.dispatch('user/communities/find', params.slug)
  },
  computed: {
    ...mapGetters({
      community: 'user/communities/current',
      feedbacks: 'user/communities/feedbacks',
      submissions: 'user/communities/submissions',
      reputation: 'user/communities/reputation',
    }),
  },
}
</script>
