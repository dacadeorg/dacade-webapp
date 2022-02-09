<template>
  <nuxt-link :to="localePath(`/communities/${details.community.slug}`)">
    <div class="flex space-x-3 text-left hover:bg-gray-50 pb-3 -mx-5 px-5">
      <Avatar
        :icon="details.community.icon"
        :color="details.community.colors.primary"
        size="medium"
        shape="rounded"
      />
      <div v-if="details.score" class="pt-1">
        <span class="block text-base font-medium leading-normal">
          <Currency :value="details.score" token="REP"
        /></span>
        <span class="block font-normal text-sm">{{
          details.community.name
        }}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Avatar from '@/components/ui/Avatar'
import Currency from '@/components/ui/Currency'

export default {
  name: 'ReputationCard',
  components: {
    Avatar,
    Currency,
  },
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object,
    },
    details: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
}
</script>
