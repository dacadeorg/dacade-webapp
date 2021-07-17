<template>
  <Wrapper>
    <div class="relative min-h-screen flex flex-col">
      <div class="relative flex-grow-0">
        <Navbar />
        <NotificationBar />
      </div>
      <div class="relative flex-grow">
        <nuxt />
      </div>
      <div class="relative flex-grow-0">
        <Footer />
        <PrivacyPolicyBanner />
      </div>
    </div>
  </Wrapper>
</template>
<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/NotificationBar'
import Wrapper from './wrapper.vue'

export default {
  components: {
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Footer,
    Wrapper,
  },
}
</script>
