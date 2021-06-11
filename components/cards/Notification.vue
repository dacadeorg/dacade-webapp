<template>
  <nuxt-link :to="details.link">
    <div class="flex hover:bg-gray-50 -mx-5 px-5 py-4">
      <div class="flex mr-2">
        <Avatar :user="user" class="w-10 h-10" />
      </div>
      <div class="pt-1 -mt-2">
        <span class="block text-base text-gray-700">{{ details.message }}</span>
        <span class="block text-gray-900 font-medium text-sm">{{ date }}</span>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Avatar from '@/components/ui/Avatar'
import moment from 'moment'

export default {
  name: 'Notification',
  components: {
    Avatar,
  },
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object,
    },
    details: {
      default: () => {
        return {}
      },
      type: Object,
    },
    extended: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    date() {
      return moment(this.details.created_at).fromNow()
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.details)
  },
}
</script>
