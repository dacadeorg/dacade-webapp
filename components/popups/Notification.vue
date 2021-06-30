<template>
  <div>
    <span v-click-outside="externalClick">
      <li
        :class="[show === true ? 'z-50' : 'z-10']"
        :style="{ width: 'calc(100vw - 40px)', maxWidth: '340px' }"
        class="inline-block align-middle mr-2 relative text-gray-500"
        @click="toggle"
      >
        <Button
          :padding="false"
          type="secondary"
          class="p-2 bg-gray-100 bg-opacity-75 hover:bg-gray-50"
          :custom-style="buttonStyles"
        >
          <!-- @click="show = !show" -->
          <BellIcon />
          <Badge v-if="unread > 0" :value="unread" class="top-0 -right-1" />
        </Button>
      </li>
      <div
        v-show="show"
        :style="{
          width: '340px',
          maxHeight: 'calc(100vh - 140px)',
          overflow: 'hidden scroll',
        }"
        class="
          z-50
          w-80
          absolute
          top-14
          right-0
          bg-white
          py-4
          px-4.5
          rounded-3.5xl
          text-gray-900
          no-scrollbar
        "
      >
        <NotificationList />
      </div>
    </span>
    <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'

import Badge from '@/components/ui/Badge'
import NotificationList from '@/components/list/Notification'
import Button from '@/components/ui/Button'
import BellIcon from '~/assets/icons/notification-bell.svg?inline'

export default {
  name: 'NotificationPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Button,
    BellIcon,
    Badge,
    NotificationList,
  },
  props: {
    buttonStyles: {
      default: null,
      type: Object,
    },
    badgeStyles: {
      default: null,
      type: Object,
    },
  },
  fetchOnServer: false,
  data() {
    return {
      show: false,
    }
  },
  computed: {
    ...mapGetters({
      unread: 'user/notifications/unread',
    }),
  },
  created() {
    this.$store.dispatch('user/notifications/all')
  },
  methods: {
    toggle() {
      this.show = !this.show

      if (this.unread && this.show) {
        this.$store.dispatch('user/notifications/read')
      }

      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
    externalClick(event) {
      if (!this.show) return
      this.show = false
      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
  },
}
</script>
