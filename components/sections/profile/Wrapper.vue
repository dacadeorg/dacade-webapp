<template>
  <Section padding="py-12">
    <Header />
    <div class="lg:flex relative">
      <div class="lg:w-1/4 relative">
        <div class="sticky top-0">
          <Navigation />
        </div>
      </div>

      <div class="lg:w-3/5 relative">
         <slot />
      </div>
    </div>
  </Section>
</template>

<script>
import Header from '@/components/sections/profile/Header'
import Navigation from '@/components/sections/profile/Navigation'
import Section from '@/components/ui/Section'



export default {
  name: 'ProfileWrapper',
  components: {
    Header,
    Section,
    Navigation,
  },
}
</script>
