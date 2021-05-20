/* eslint-disable vue/no-v-html */
<template>
  <Section padding="pt-20 lg:pb-24 md:pb-24">
    <div id="communities" class="lg:flex md:flex relative items-end">
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
    <div class="lg:flex xl:flex mt-7 flex-wrap justify-between">
      <CommunityCard
        v-for="(community, i) in communities"
        :key="i"
        :community="community"
      />
      <PartneringCard />
    </div>
  </Section>
</template>

<script>
import { mapGetters } from 'vuex'

import Section from '@/components/ui/Section'
import CommunityCard from '@/components/cards/Community'
import PartneringCard from '@/components/cards/Partnering'

export default {
  name: 'CommunitiesSection',
  components: {
    Section,
    CommunityCard,
    PartneringCard,
  },
  computed: {
    ...mapGetters({
      communities: 'communities/list',
    }),
  },
}
</script>
