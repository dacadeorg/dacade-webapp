<template>
  <div class="relative">
    <MainHeaderSection />
    <Section>
      <div class="lg:flex">
        <div class="hidden lg:block w-1/4 py-3 pr-4 lg:py-14">
          <Navigation />
        </div>
        <div class="lg:hidden pt-8 pb-0 w-full lg:py-14">
          <MobileNav show-top-border />
        </div>
        <div class="w-full lg:w-3/4">
          <OverviewSection />
        </div>
      </div>
    </Section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import Navigation from '@/components/sections/communities/Navigation'
import OverviewSection from '@/components/sections/communities/overview'
import Section from '@/components/ui/Section'
import MobileNav from '@/components/sections/communities/MobileNav'

export default {
  scrollToTop: true,
  layout: 'community',
  components: {
    MainHeaderSection,
    OverviewSection,
    Navigation,
    MobileNav,
    Section,
  },
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/chapters/all', params.slug)
    await store.dispatch('communities/challenges/all', params.slug)
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
    }),
  },
}
</script>
