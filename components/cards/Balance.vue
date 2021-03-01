<template>
  <div class="flex space-x-3 text-left">
    <Avatar :icon="details.icon" size="medium" />
    <div class="pt-1">
      <span
        class="block text-base font-medium leading-normal"
      >{{ details.amount }} {{ details.denom }}</span>
      <span class="block font-normal text-sm">{{ details.description }}</span>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar'

export default {
  name: 'Balance',
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
