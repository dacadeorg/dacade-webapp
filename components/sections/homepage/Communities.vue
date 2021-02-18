/* eslint-disable vue/no-v-html */
<template>
  <Section padding="pt-20">
    <div class="flex relative items-end">
      <div class="pr-5">
        <p class="uppercase font-semibold leading-none text-base">
          {{ $t("page.index.communities.title") }}
        </p>
      </div>
      <div class="pl-7 relative">
        <div class="message-bubble">
          {{ $t("page.index.communities.subtitle") }}
        </div>
      </div>
    </div>
    <div class="flex mt-7 flex-wrap justify-between">
      <CommunityCard v-for="(community, i) in communities" :key="i" :community="community" />
      <PartneringCard />
    </div>
  </Section>
</template>

<script>
import Section from '@/components/ui/Section'
import CommunityCard from '@/components/cards/Community'
import PartneringCard from '@/components/cards/Partnering'
import BlockchainIcon from '@/assets/icons/communities/blockchain.svg?data'
import AeternityIcon from '@/assets/icons/communities/aeternity.svg?data'
import WebIcon from '@/assets/icons/communities/web.svg?data'

export default {
  name: 'CommunitiesSection',
  components: {
    Section,
    CommunityCard,
    PartneringCard
  },
  data () {
    return {
      communities: [{
        title: 'Introduction to Blockchain',
        subtitle: 'Learn the most important concepts of blockchain technology',
        rewards: 5,
        icon: BlockchainIcon,
        colors: {
          primary: '#01464C',
          accent: '#34E256'
        },
        url: ''
      },
      {
        title: 'Aeternity Development 101',
        subtitle: 'Learn how to build a voting dApp on top of Aeternity',
        rewards: 20,
        icon: AeternityIcon,
        colors: {
          primary: '#FF3A02',
          accent: '#47110A'
        },
        url: ''
      },
      {
        title: 'Web Development 101',
        subtitle: 'Learn how to build and host a website with bootstrap',
        rewards: 20,
        icon: WebIcon,
        colors: {
          primary: '#381B84',
          accent: '#24DAD9'
        },
        url: ''
      }]
    }
  }
}
</script>
