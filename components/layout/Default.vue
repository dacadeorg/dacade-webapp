<template>
  <Wrapper>
    <div class="relative min-h-screen flex flex-col">
      <div class="relative flex-grow-0">
        <Navbar />
        <NotificationBar />
      </div>
      <div class="relative flex-grow">
        <slot />
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
import Wrapper from './Wrapper.vue'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/layout/NotificationBar'
import DiscordButton from '@/components/ui/DiscordButton'

export default {
  name: 'DefaultLayout',
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
