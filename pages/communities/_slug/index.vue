<template>
  <div class="relative">
    <MainHeaderSection />
    <Section padding="py-0">
      <div class="flex">
        <div class="w-1/4 py-14">
          <Navigation />
        </div>
        <div class="w-3/4">
          <OverviewSection />
        </div>
      </div>
    </Section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import MainHeaderSection from '@/components/sections/communities/MainHeader'
import Navigation from '@/components/sections/communities/Navigation'
import OverviewSection from '@/components/sections/communities/Overview'
import Section from '@/components/ui/Section'

export default {
  scrollToTop: true,
  layout: 'community',
  components: {
    MainHeaderSection,
    OverviewSection,
    Navigation,
    Section
  },
  async fetch ({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/content', params.slug)
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    })
  }
}
</script>
