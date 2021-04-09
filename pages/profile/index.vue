<template>
  <Section padding="py-0">
    <Header />
    <div>
      <div>
        <Navigation />
      </div>
      <div>
        <nuxt-child />
      </div>
    </div>
  </Section>
</template>

<script>
import Header from '@/components/sections/profile/Header'
import Navigation from '@/components/sections/profile/Navigation'
import Section from '@/components/ui/Section'

export default {
  name: 'Profile',
  components: {
    Header,
    Section,
    Navigation
  }
}
</script>
