<template>
  <div>
    <span v-click-outside="externalClick">
      <li
        :class="[show === true ? 'z-0' : 'z-10']"
        class="inline-block align-middle mr-2 relative text-gray-500"
        @click="toggle"
      >
        <Button :padding="false" class="pl-7.5">
          <span class="py-4 inline-block align-middle pr-5.75">{{
            $t('page.index.main.button')
          }}</span>
          <span class="inline-block py-3 pr-3 align-middle">
            <ArrowRightIcon />
          </span>
        </Button>
      </li>
      <div
        v-show="show"
        class="
          h-full
          w-full
          absolute
          top-0
          left-0
          bg-white
          py-4
          px-4.5
          rounded-3.5xl
          text-gray-900
          no-scrollbar
        "
      >
        <Video
          class="z-50 content-wrapper max-w-3xl max-h-1xl"
          url="https://youtu.be/GmVrQDulaLY"
        />
      </div>
    </span>
    <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import Button from '@/components/ui/Button'
import Video from '@/components/ui/Video'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

// import Badge from '@/components/ui/Badge'
// import NotificationList from '@/components/list/Notification'
// import BellIcon from '~/assets/icons/notification-bell.svg?inline'

export default {
  name: 'VideoPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    Button,
    Video,
    ArrowRightIcon,
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
