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
import Wrapper from '@/components/layout/Wrapper'
import Navbar from '@/components/layout/Navbar'
import PrivacyPolicyBanner from '@/components/banner/PrivacyPolicy'
import NotificationBar from '@/components/layout/NotificationBar'

export default {
  name: 'LayoutWithoutFooter',
  components: {
    Navbar,
    PrivacyPolicyBanner,
    NotificationBar,
    Wrapper,
  },
}
</script>
