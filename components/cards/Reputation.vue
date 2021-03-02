<template>
  <div class="flex space-x-3 text-left">
    <Avatar
      :icon="details.community.icon"
      :color="details.community.colors.primary"
      size="medium"
      shape="rounded"
    />
    <div class="pt-1">
      <span
        class="block text-base font-medium leading-normal"
      >{{ details.value }} REP</span>
      <span class="block font-normal text-sm">{{
        details.community.name
      }}</span>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar'

export default {
  name: 'ReputationCard',
  components: {
    Avatar
  },
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object
    },
    details: {
      default: () => {
        return {}
      },
      type: Object
    }
  }
}
</script>
