<template>
  <div class="text-center pb-24">
    <Avatar size="extra" :user="user" />
    <span class="block capitalize text-5xl mt-5 leading-none">{{
      user.displayName
    }}</span>
    <span class="block text-sm leading-none mt-2">{{ joined }}</span>
  </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar'
import { mapGetters } from 'vuex'
import Moment from 'moment'

export default {
  name: 'ProfileHeader',
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters({
      balance: 'user/balance',
      user: 'user/get',
    }),
    joined() {
      return Moment(this.user.joined).format('MMMM YYYY')
    },
  },
}
</script>
