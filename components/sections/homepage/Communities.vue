/* eslint-disable vue/no-v-html */
<template>
  <Section padding="pt-20 lg:pb-24 md:pb-24">
    <div id="communities" class="md:flex relative items-end">
      <div class="pr-5">
        <p class="uppercase font-semibold leading-none text-base">
          {{ $t('page.index.communities.title') }}
        </p>
      </div>
      <div class="pl-7 relative hidden lg:block md:block">
        <div class="message-bubble">
          {{ $t('page.index.communities.subtitle') }}
        </div>
      </div>
    </div>
    <div
      class="
        mt-7
        grid grid-cols-1
        lg:grid-cols-2
        gap-x-5 gap-y-0.5
        lg:gap-y-5
        md:gap-y-5
        justify-stretch-items
      "
    >
      <!-- <CommunityCard
        v-for="(community, i) in communities"
        :key="i"
        :community="community"
      /> -->
      <div v-for="community in communities" :key="community.key">
        <CommunityCard :community="community" />
      </div>

      <PartneringCard />
    </div>
  </Section>
</template>

<script>
import { mapGetters } from 'vuex'

import Section from '@/components/ui/Section'
// import CommunityCard from '@/components/cards/Community'
import PartneringCard from '@/components/cards/Partnering'
import CommunityCard from '@/components/cards/CommunityCard/CommunityCard'

export default {
  name: 'CommunitiesSection',
  components: {
    Section,
    CommunityCard,
    PartneringCard,
  },
  fetch({ store }) {
    return store.dispatch('communities/all')
  },
  computed: {
    ...mapGetters({
      communities: 'communities/list',
    }),
  },
}
</script>
