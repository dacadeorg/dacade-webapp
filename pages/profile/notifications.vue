<template>
  <Wrapper>
    <NotificationList />
  </Wrapper>
</template>

<script>
import Wrapper from '@/components/sections/profile/Wrapper'
import NotificationList from '@/components/list/Notification'

export default {
  name: 'Notifications',
  components: {
    Wrapper,
    NotificationList
  }
}
</script>
