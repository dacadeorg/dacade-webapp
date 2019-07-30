<template>
  <div>
    <Navigation />
    <div v-if="userNotifications">
      <b-button variant="primary" @click.prevent="markNotificationsRead()">
        Mark as seen
      </b-button>
      <div
        v-for="notification in orderDesc()"
        :key="notification.id"
        :class="{'styleA': !notification.notificationRead}"
      >
        {{notification.message}}
        {{notification.key}}
        <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="notification.link">
          See
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({
      userNotifications: 'userNotifications'
    })
  },
  methods: {
    markNotificationsRead() {
      for (let index = 0; index < Object.values(this.userNotifications).length; index++) {
        if (Object.values(this.userNotifications)[index].notificationRead === false) {
          const notificationUpdate = {
            id: Object.keys(this.userNotifications)[index],
            userId: Object.values(this.userNotifications)[index].userId
          }
          this.$store.dispatch('setUserNotificationSeen', notificationUpdate)
        }
      }
    },
    orderDesc() {
      return Object.values(this.userNotifications).reverse()
    }
  }
}
</script>

<style scoped>
.styleA{
  background-color: green;
}
</style>
