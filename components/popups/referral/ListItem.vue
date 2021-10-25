<template>
  <div class="flex justify-between w-full items-center text-gray-900">
    <div class="flex items-center">
      <Avatar
        class="w-6 h-6 rounded overflow-hidden"
        :icon="referral.community.icon"
        :image="referral.community.image"
        :color="referral.community.colors.primary"
        size="mini"
        shape="squared"
      />
      <div class="font-medium text-sm leading-relaxed ml-2">
        {{ referral.title || referral.community.name }}
      </div>
    </div>
    <div>
      <Reward type="gray" :reward="referral.reward" />
    </div>
  </div>
</template>

<script>
import Reward from '@/components/badges/Reward'
import Avatar from '@/components/ui/Avatar'

export default {
  name: 'ReferralListItem',
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
}
</script>
