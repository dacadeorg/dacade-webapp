<template>
  <div class="relative">
    <MainSection />
    <CommunitiesSection />
    <TestimonialsSection />
    <Privacy />
  </div>
</template>
<script>
import MainSection from '@/components/sections/homepage/Main'
import CommunitiesSection from '@/components/sections/homepage/Communities'
import TestimonialsSection from '@/components/sections/homepage/Testimonials'
// import Privacy from '@/components/popups/Privacy'
import Privacy from '@/components/banner/PrivacyPolicy'

// import firebase from '@/plugins/firebase'

export default {
  ssr: true,
  components: {
    MainSection,
    CommunitiesSection,
    TestimonialsSection,
    Privacy,
  },
  fetch({ store }) {
    return store.dispatch('communities/all')
  },
}
</script>
