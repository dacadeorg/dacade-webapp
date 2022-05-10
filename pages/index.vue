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
}
</script>
