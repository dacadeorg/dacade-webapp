<template>
  <div>
    <NotificationList extended />
    <AchievementList extended />
  </div>

</template>

<script>
import NotificationList from '@/components/list/Notification'
import AchievementList from '@/components/list/Certificates'

export default {
  name: 'Notifications',
  components: {
    AchievementList,
    NotificationList,
  },
  layout: 'profile',
  middleware: 'auth',
}
</script>
