<template>
  <div class="relative">
    <Navbar />
    <NotificationBar />
    <div class="relative">
      <nuxt />
    </div>
    <Footer />
    <PrivacyPolicyBanner />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/NotificationBar'

export default {
  components: {
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Footer,
  },
}
</script>
