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
      <DiscordButton />
      <div class="relative flex-grow-0">
        <Footer />
        <PrivacyPolicyBanner />
      </div>
    </div>
  </Wrapper>
</template>
<script>
import Wrapper from './wrapper.vue'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/NotificationBar'
import DiscordButton from '@/components/ui/DiscordButton'

export default {
  components: {
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Footer,
    Wrapper,
    DiscordButton,
  },
}
</script>
