<template>
  <div class="text-center pt-12 pb-24">
    <Avatar size="extra" :user="user" />
    <span class="block capitalize text-5xl mt-5 leading-none">{{
      user.displayName
    }}</span>
    <span class="block text-sm leading-none mt-2">Joined June 2020</span>
  </div>
</template>

<script>
import Avatar from '@/components/ui/Avatar'
import { mapGetters } from 'vuex'
export default {
  name: 'ProfileHeader',
  components: {
    Avatar
  },
  computed: {
    ...mapGetters({
      balance: 'user/balance',
      user: 'user/get'
    })
  }
}
</script>
