<template>
  <NotificationList extended />
</template>

<script>
import NotificationList from '@/components/list/Notification'

export default {
  name: 'Notifications',
  components: {
    NotificationList,
  },
  layout: 'profile',
  middleware: 'auth',
}
</script>
