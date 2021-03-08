<template>
  <div class="relative">
    <Navbar :settings="settings" />
    <NotificationBar />
    <div class="relative">
      <nuxt />
    </div>
    <Footer />
    <PrivacyPolicyBanner />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/NotificationBar'

export default {
  components: {
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Footer
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors'
    }),
    settings () {
      return {
        colors: this.colors
      }
    }
  }
}
</script>
