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
          class="p-2"
          :custom-style="buttonStyles"
        >
          <!-- @click="show = !show" -->
          <BellIcon />
          <Badge
            v-if="count > 0"
            :value="count"
            class="top-0 -right-1"
            :custom-style="badgeStyles"
          />
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
      count: 'user/notifications/count',
    }),
  },
  created() {
    this.$store.dispatch('user/notifications/all')
  },
  methods: {
    toggle() {
      this.show = !this.show
      if (this.show) {
        const body = document.body
        body.style.position = 'fixed'
        body.style.width = '100%'
      } else {
        const body = document.body
        const scrollY = body.style.top
        body.style.position = 'relative'
        body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    },
    externalClick(event) {
      if (this.show) {
        this.show = false
        const body = document.body
        const scrollY = body.style.top
        body.style.position = 'relative'
        body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    },
  },
}
</script>
