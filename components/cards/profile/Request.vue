<template>
  <div v-if="referrals && referrals.length" class="relative flex items-center">
    <div class="flex pr-3 cursor-pointer" @click="onClick">
      <Avatar
        v-for="(referral, index) in previewList"
        :key="index"
        :class="['border-2 border-solid border-white', { '-ml-3': index > 0 }]"
        :use-link="false"
        :user="referral.user"
      />
    </div>
    <div></div>
    <div
      class="text-sm md:flex text-gray-500 md:font-medium font-normal relative cursor-pointer"
      @click="onClick"
    >
      <span class="md:inline-block"
        >{{ referrals.length }} Friends have used your invite code</span
      >
      <!--      <span class=" border-r-2 hidden md:block border-solid border-gray-300 px-1 "/>-->
      <!--      <span class="md:inline-block md:px-3">4 Pending invitations</span>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '~/components/ui/Avatar'

export default {
  name: 'Request',
  components: { Avatar },
  computed: {
    ...mapGetters({
      referrals: 'user/referrals/list',
    }),
    previewList() {
      return this.referrals.slice(0, 3)
    },
  },
  methods: {
    onClick() {
      this.$router.push(this.localePath('/profile/referrals'))
    },
  },
}
</script>
