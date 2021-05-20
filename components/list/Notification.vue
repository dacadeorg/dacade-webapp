<template>
  <div class="text-left">
    <span
      class="
        uppercase
        block
        text-xs
        font-semibold
        text-gray-500
        leading-relaxed
      "
      >{{ $t('nav.notification') }}</span
    >
    <div :class="{ 'space-y-4 mt-3': !extended, 'space-y-16 mt-4': extended }">
      <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :user="user"
        :details="notification"
        :extended="extended"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import NotificationCard from '@/components/cards/Notification'

export default {
  name: 'NotificationList',
  components: {
    NotificationCard,
  },
  props: {
    value: {
      default: 0,
      type: Number,
    },
    extended: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      notifications: 'user/notifications/get',
      user: 'user/get',
    }),
  },
}
</script>
