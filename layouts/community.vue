<template>
  <Wrapper>
    <ThemeWrapper :colors="colors">
      <div class="relative overflow-hidden lg:overflow-auto">
        <Navbar :settings="settings" />
        <NotificationBar />
        <div class="relative">
          <nuxt />
        </div>
        <DiscordButton />
        <Footer />
        <PrivacyPolicyBanner />
      </div>
    </ThemeWrapper>
  </Wrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import Wrapper from './wrapper.vue'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/NotificationBar'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import DiscordButton from '@/components/ui/DiscordButton'

export default {
  components: {
    ThemeWrapper,
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Footer,
    Wrapper,
    DiscordButton,
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
