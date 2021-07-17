<template>
  <Wrapper>
    <div class="relative min-h-screen">
      <div class="relative z-99">
        <Navbar />
        <NotificationBar />
      </div>
      <nuxt />
      <PrivacyPolicyBanner />
    </div>
  </Wrapper>
</template>
<script>
import Navbar from '@/components/Navbar'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/NotificationBar'
import Wrapper from './wrapper.vue'

export default {
  components: {
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Wrapper,
  },
}
</script>
