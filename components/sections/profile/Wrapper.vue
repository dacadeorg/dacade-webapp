<template>
  <Section padding="py-0">
    <Header />
    <div class="flex">
      <div class="w-1/4">
        <Navigation />
      </div>
      <div class="w-3/4">
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
    Navigation
  }
}
</script>
