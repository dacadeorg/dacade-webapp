<template>
  <component
    :is="notificationsLink ? 'nuxt-link' : 'div'"
    :to="notificationsLink"
    :class="extended ? 'rounded-3xl' : ''"
    class="flex hover:bg-gray-50 py-4 -mx-5 px-5 cursor-pointer"
  >
    <div class="flex mr-2 relative">
      <Avatar :user="user" profileVerifySize="mini" class="w-10 h-10" />
    </div>
    <div class="pt-1 -mt-2">
      <span class="block text-base text-gray-700">{{ details.message }}</span>
      <span :title="date" class="block text-gray-900 font-medium text-sm">{{
        humanizedDate
      }}</span>
    </div>
  </component>
</template>

<script>
import Avatar from '@/components/ui/Avatar'
import DateManager from '@/utilities/DateManager'

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
    humanizedDate() {
      return DateManager.fromNow(this.details.created_at, this.$i18n.locale)
    },
    date() {
      return DateManager.intlFormat(this.details.created_at, this.$i18n.locale)
    },
    link() {
      switch (this.details.type) {
        case 'SUBMISSION':
        case 'REFERRAL':
        case 'FEEDBACK':
          return `/${this.details.metadata.submission}`
        default:
          return this.details.link
      }
    },
    notificationsLink() {
      if (!this.link) return null
      return this.localePath(this.link)
      // window.open(this.link, '_blank')
    },
  },
  methods: {
    goToLink() {
      if (!this.link) return
      /* 
        check if string starts with /
      */
      if (this.link.startsWith('/')) {
        return this.$router.push(this.localePath(this.link))
      }
      window.open(this.link, '_blank')
    },
  },
}
</script>
