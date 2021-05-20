<template>
  <Section padding="py-0">
    <Header />
    <div class="lg:flex">
      <div class="px-6 w-full lg:w-1/4">
        <CommunityNavigation hide-title />
      </div>
      <div class="w-full lg:w-3/4">
        <slot />
      </div>
    </div>
  </Section>
</template>

<script>
import Header from '@/components/sections/profile/Header'
import CommunityNavigation from '@/components/sections/profile/CommunityNavigation'
import Section from '@/components/ui/Section'

export default {
  name: 'CommunityWrapper',
  components: {
    Header,
    Section,
    CommunityNavigation
  }
}
</script>
