<template>
  <div
    class="cursor-pointer flex md:flex-row-reverse md:space-x-5 px-5 min-h-32 md:h-auto md:w-full justify-between hover:bg-secondary relative"
    @click="openLink()"
  >
    <div
      class="bg-theme-accent flex-col w-full h-full justify-between md:-space-y-1 pl-3 pr-5 mt-7 mb-5"
    >
      <div class="relative w-full md:flex md:justify-between">
        <div class="font-medium text-md md:pt-1.5">
          {{ referral.title || referral.community.name }}
        </div>
      </div>

      <div
        class="inline-flex md:flex h-2/3 md:flex-row flex-col-reverse justify-between"
      >
        <div class="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">
          {{ $t('bounties.reward.referral') }}
        </div>
        <div>
          <Reward type="gray" :reward="referral.reward" />
        </div>
      </div>
    </div>
    <div class="self-start relative mt-15 md:mt-7">
      <Avatar
        class="w-15 h-15 rounded-xl overflow-hidden"
        :icon="referral.community.icon"
        :image="referral.community.image"
        :color="cardColor"
        size="medium-fixed"
        shape="rounded"
      />
    </div>
  </div>
</template>

<script>
import Reward from '@/components/badges/Reward'
import Avatar from '@/components/ui/Avatar'

export default {
  name: 'Referral',
  components: {
    Reward,
    Avatar,
  },
  props: {
    referral: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    cardColor() {
      const colors = this.referral?.community?.colors;
      return colors?.cover?.background || colors?.primary 
    },
  },
  methods: {
    openLink() {
      this.$store.dispatch('ui/toggleShowReferralPopup', true)
    },
  },
}
</script>
