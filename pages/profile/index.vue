<template>
  <div>
    <NotificationList extended />
    <CertificatesList />
  </div>

</template>

<script>
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
}
</script>
