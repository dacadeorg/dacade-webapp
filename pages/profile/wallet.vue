<template>
  <Wrapper>
    <WalletCard :title="text" :amount="price" />
  </Wrapper>
</template>

<script>
import Wrapper from '@/components/sections/profile/Wrapper'
import WalletCard from '@/components/cards/Wallet'

export default {
  name: 'Wallet',

  components: {
    Wrapper,
    WalletCard
  },

  data: () => ({
    text: 'hello',
    price: 5.00
  })
}
</script>
