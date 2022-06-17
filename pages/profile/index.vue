<template>
  <div>
    <NotificationList extended />
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import NotificationList from '@/components/list/Notification'

export default {
  name: 'Notifications',
  components: {
    NotificationList,
  },
  layout: 'profile',
  middleware: 'auth',
  computed : {
    ...mapGetters({
      user: 'user/get',
    }),
  },
  mounted() {
    this.$store.dispatch("user/certificates/all", this.user.username);
  }
}
</script>
