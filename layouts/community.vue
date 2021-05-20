<template>
  <ThemeWrapper :colors="colors">
    <div class="relative">
      <Navbar :settings="settings" />
      <NotificationBar />
      <div class="relative">
        <nuxt />
      </div>
      <Footer />
      <PrivacyPolicyBanner />
    </div>
  </ThemeWrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/NotificationBar'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'

export default {
  components: {
    ThemeWrapper,
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Footer,
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    settings() {
      return {
        colors: this.colors,
      }
    },
  },
}
</script>
