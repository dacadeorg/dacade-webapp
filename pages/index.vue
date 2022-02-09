<template>
  <div class="relative">
    <MainSection />
    <CommunitiesSection />
    <TestimonialsSection />
  </div>
</template>
<script>
import MainSection from '@/components/sections/homepage/Main'
import CommunitiesSection from '@/components/sections/homepage/Communities'
import TestimonialsSection from '@/components/sections/homepage/Testimonials'

export default {
  ssr: true,
  components: {
    MainSection,
    CommunitiesSection,
    TestimonialsSection,
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('communities/all')
    } catch (e) {
      error(e)
    }
  },
}
</script>
