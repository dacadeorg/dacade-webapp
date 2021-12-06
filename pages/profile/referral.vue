<template>
  <Wrapper>
    <div class="lg:w-9/12 xl:w-2/3">
      <div v-if="!cashable">
        <EditProfile :show="showEditProfile" @close="showEditProfile = false" />
      </div>
      <Referral />
    </div>
  </Wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import Wrapper from '@/components/sections/profile/Wrapper'
import EditProfile from '@/components/sections/profile/modals/EditProfile'
import Referral from '@/components/cards/profile/Referral'

export default {
  name: 'Wallet',

  components: {
    Wrapper,
    EditProfile,
    Referral,
  },

  data: () => ({
    showEditProfile: false,
  }),

  fetch() {
    return this.$store.dispatch('user/wallets/all')
  },

  computed: {
    ...mapGetters({
      wallets: 'user/wallets/list',
      user: 'user/get',
    }),
    cashable() {
      return this.user?.firstName && this.user?.lastName
    },
  },
}
</script>
