<template>
  <div class="text-left relative">
    <span
      class="uppercase block text-xs font-semibold text-gray-500 leading-relaxed"
      >Achievements</span
    >
    <div :class="{ 'space-y-4 mt-3': !extended, 'space-y-4 mt-4': extended }">
      <!-- <NotificationCard
        v-for="notification in notifications"
        :key="notification.id"
        :user="user"
        :details="notification"
        :extended="extended"
      /> -->
      <!-- <CertificateCard
        :user="user"
        :details="user"
        :extended="extended"
      /> -->
<!-- 
      {{ achievements }}
      {{ user }} -->
      
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

// import NotificationCard from '@/components/cards/Notification'
// import CertificateCard from '@/components/cards/Certificate'

export default {
  name: "CertificatesList",
    components: {
      // CertificateCard
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
      achievements: 'user/certificates/list',
      user: 'user/get',
    }),
  },
  mounted() {
    this.$store.dispatch("user/certificate/:id", this.user.username);
  }
};
</script>
