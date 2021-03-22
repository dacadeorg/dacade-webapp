<template>
  <Section padding="py-0">
    <div class="flex">
      <div class="w-1/4 py-14">
        <Navigation />
      </div>
      <div class="w-3/4">
        <div
          class="py-4 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
        />
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'
import Navigation from '@/components/sections/communities/Navigation'
import Section from '@/components/ui/Section'

export default {
  components: {
    Navigation,
    Section
  },
  scrollToTop: true,
  async fetch ({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/content', params.slug)
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      community: 'communities/current'
    })
  }
}
</script>
