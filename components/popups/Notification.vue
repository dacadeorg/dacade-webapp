<template>
  <span v-click-outside="externalClick">
    <li class="inline-block align-middle mr-2 z-0 relative">
      <Button
        :padding="false"
        type="secondary"
        class="p-2"
        :custom-style="buttonStyles"
        @click="show = !show"
      >
        <BellIcon />
        <Badge v-if="count > 0" :value="count" />
      </Button>
    </li>
    <div
      v-show="show"
      class="w-80 absolute top-14 right-0 z-10 bg-secondary py-4 px-4.5 rounded-3.5xl text-gray-900"
    >
      <NotificationList />
    </div>
  </span>
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
    clickOutside: vClickOutside.directive
  },
  components: {
    Button,
    BellIcon,
    Badge,
    NotificationList
  },
  props: {
    buttonStyles: {
      default: null,
      type: Object
    }
  },
  data () {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({
      count: 'notification/count'
    })
  },
  methods: {
    externalClick (event) {
      if (this.show) {
        this.show = false
      }
    }
  }
}
</script>
