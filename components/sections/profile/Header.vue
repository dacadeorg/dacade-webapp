<template>
  <div class="text-center pb-24">
    <Avatar size="extra" :user="user" />
    <span class="block capitalize text-5xl mt-5 leading-none">{{
      user.displayName
    }}</span>
    <span v-if="joined" class="block text-sm leading-none mt-2">{{
      joined
    }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import DateManager from '@/utilities/DateManager'

export default {
  name: 'ProfileHeader',
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters({
      balance: 'user/balance',
      authUser: 'user/get',
      profileUser: 'profile/users/current',
    }),
    joined() {
      if (!this.user.joined) return null
      return DateManager.format(
        this.user.joined,
        'MMMM yyyy',
        this.$i18n.locale
      )
    },
    user() {
      if (
        this.$route.params?.username &&
        this.$route.params?.username?.toLowerCase() !==
          this.authUser?.displayName?.toLowerCase()
      ) {
        return this.profileUser
      }
      return this.authUser
    },
  },
}
</script>
