<template>
  <div class="flex">
    <div class="flex-grow mr-3">
      <Avatar :user="user" size="medium" />
    </div>
    <div class="pt-1">
      <span class="block text-sm">{{ details.message }}</span>
      <span class="block text-primary text-xs">{{ date }}</span>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar'
import moment from 'moment'

export default {
  name: 'Notification',
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
  },
  computed: {
    date () {
      return moment(this.details.date).fromNow()
    }
  }
}
</script>
