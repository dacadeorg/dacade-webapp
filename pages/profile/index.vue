<template>
  <div>
    <NotificationList extended />
    <CertificatesList />
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import NotificationList from '@/components/list/Notification'
import CertificatesList from '@/components/list/Certificates';

export default {
  name: 'Notifications',
  components: {
    CertificatesList,
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
