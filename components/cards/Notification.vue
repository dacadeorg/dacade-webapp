<template>
  <div class="flex">
    <div class="flex-none mr-3">
      <Avatar :user="user" size="medium" />
    </div>
    <div class="pt-1 font-normal">
      <span
        class="flex-grow block"
        :class="{ 'text-sm': !extended, 'text-lg': extended }"
        >{{ details.message }}</span
      >
      <span
        class="block text-primary mt-1.5"
        :class="{ 'text-xs': !extended, 'text-sm': extended }"
        >{{ date }}</span
      >
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar'
import moment from 'moment'

export default {
  name: 'Notification',
  components: {
    Avatar,
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
    extended: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    date() {
      return moment(this.details.created_at).fromNow()
    },
  },
}
</script>
