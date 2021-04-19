<template>
  <Wrapper>
    <WalletCard />
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
  }
}
</script>
