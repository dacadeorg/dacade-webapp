<template>
  <div class="text-left">
    <span
      class="uppercase block text-xs font-semibold text-gray-500 leading-relaxed"
    >Notifications</span>
    <div class="space-y-4 mt-3">
      <NotificationCard
        v-for="notification in orderedList"
        :key="notification.id"
        :user="user"
        :details="notification"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NotificationCard from '@/components/cards/Notification'

export default {
  name: 'NotificationListCard',
  components: {
    NotificationCard
  },
  props: {
    value: {
      default: 0,
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      notifications: 'notification/get',
      user: 'user/get'
    }),
    orderedList () {
      if (!this.notifications) {
        return []
      }
      console.log(this.notifications)
      return Object.values(this.notifications).reverse()
    }
  }
}
</script>
