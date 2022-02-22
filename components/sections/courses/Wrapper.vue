<template>
  <Section>
    <div class="lg:flex h-auto">
      <div
        class="hidden lg:block sticky top-0 self-start w-1/4 py-3 pr-4 lg:py-14"
      >
        <Navigation />
      </div>
      <div class="lg:hidden pt-8 pb-0 w-full lg:py-14">
        <MobileNav show-top-border />
      </div>
      <div class="w-full lg:w-3/4">
        <slot />
      </div>
    </div>
  </Section>
</template>
<script>
import Navigation from '@/components/sections/courses/Navigation'
import Section from '@/components/ui/Section'
import MobileNav from '@/components/sections/courses/MobileNav'

export default {
  components: {
    Navigation,
    MobileNav,
    Section,
  },
}
</script>
