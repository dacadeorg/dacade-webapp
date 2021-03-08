<template>
  <div class="relative">
    <MainHeader />
    <Section padding="py-14">
      <div class="flex">
        <div class="w-1/4">
          <Navigation />
        </div>
        <div class="w-3/4" />
      </div>
    </Section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import MainHeader from '@/components/sections/communities/MainHeader'
import Navigation from '@/components/sections/communities/Navigation'
import Section from '@/components/ui/Section'

export default {
  scrollToTop: true,
  layout: 'community',
  components: {
    MainHeader,
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
