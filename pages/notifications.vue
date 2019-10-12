<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-xl-6 mx-auto mt-4">
          <div v-if="userNotifications">
            <div class="text-center mb-4">
            </div>
            <div
              v-for="notification in orderDesc()"
              :key="notification.id"
              :class="{'unread': !notification.notificationRead }"
              class="muted-dark mb-4 notification"
            >
              <nuxt-link :to="notification.link">
                <div>
                  <b>
                    {{ convertDate(notification.date) }}
                  </b>
                  <p class="mt-2">
                    {{ notification.message }}
                  </p>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
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
  created() {
    setTimeout(this.markNotificationsRead, 5000)
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
    },
    contentPreview(content) {
      const maxLength = 160
      let trimmedString = content.substr(0, maxLength)
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))
      return trimmedString
    },
    convertDate(date) {
      const submissionInputDate = new Date(date)
      const submissionDate = submissionInputDate.toDateString().slice(4, -4)
      let submissionMinutes = submissionInputDate.getMinutes()
      if (submissionMinutes < 10) {
        submissionMinutes = '0' + submissionMinutes
      }
      let submissionHours = submissionInputDate.getHours()
      if (submissionHours < 10) {
        submissionHours = '0' + submissionHours
      }
      const submissionTime = submissionHours + ':' + submissionMinutes
      const submissionTimeAndDate = submissionDate + ' ' + submissionTime
      return submissionTimeAndDate
    }
  }
}
</script>

<style scoped>
.notification {
  border-radius: 0.35rem;
  background: #343b42;
  padding: 1em;
  box-shadow:
    0 1px 3px 0 rgba(0,0,0,.2),
    0 1px 1px 0 rgba(0,0,0,.14),
    0 2px 1px -1px rgba(0,0,0,.12);
}

.notification:hover {
  border: 1.6px solid #53d1af;
  background: #343b42;
  padding: 1em;
  box-shadow:
    0 5px 5px -3px rgba(0,0,0,.2),
    0 8px 10px 1px rgba(0,0,0,.14),
    0 3px 14px 2px rgba(0,0,0,.12);
}

.notification:hover a{
  text-decoration: none;
}

.unread {
  color: rgba(255,255,255,.8);
  border-bottom: 2px solid rgba(255,255,255,.8);
  /* animation: glow 0.5s infinite alternate; */
}

.unread a{
  color: rgba(255,255,255,.8);
}

/* @keyframes glow {
  from {
    border-bottom: 2px solid rgba(255,255,255,.8);
  }
  to {
    border-bottom: 2px solid rgba(255,255,255,.0);
  }
} */
</style>
