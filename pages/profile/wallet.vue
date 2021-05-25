<template>
  <Wrapper>
    <WalletCard v-for="wallet in wallets" :key="wallet.id" :details="wallet" />
  </Wrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import Wrapper from '@/components/sections/profile/Wrapper'
import WalletCard from '@/components/cards/Wallet'

export default {
  name: 'Wallet',

  components: {
    Wrapper,
    WalletCard,
  },

  data: () => ({
    text: 'hello',
    price: 5.0,
  }),

  fetch() {
    return this.$store.dispatch('user/wallets/all')
  },

  computed: {
    ...mapGetters({
      wallets: 'user/wallets/list',
    }),
  },
}
</script>
