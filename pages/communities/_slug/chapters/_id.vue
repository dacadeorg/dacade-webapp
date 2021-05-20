<template>
  <Section padding="py-0">
    <div class="lg:flex">
      <div class="hidden lg:block w-1/4 py-3 pr-4 lg:py-14">
        <Navigation />
      </div>
      <div class="lg:hidden py-4 w-full lg:py-14">
        <MobileNav />
      </div>
      <div class="lg:w-3/4">
        <div
          class="
            py-8
            flex flex-col
            divide-y divide-solid divide-gray-200
            space-y-8
            text-gray-700
          "
        >
          <Header />
          <MaterialSection
            v-for="(material, i) in chapter.materials"
            :key="i"
            :material="material"
          />
          <PageNavigation />
        </div>
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
import MobileNav from '@/components/sections/communities/MobileNav'
import PageNavigation from '@/components/sections/communities/PageNavigation.vue'
import Header from '@/components/sections/communities/chapters/Header'
import MaterialSection from '@/components/sections/communities/chapters/Material'
import Section from '@/components/ui/Section'

export default {
  components: {
    MobileNav,
    Navigation,
    Section,
    Header,
    MaterialSection,
    PageNavigation,
  },
  scrollToTop: true,
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/chapters/find', params.id)
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      community: 'communities/current',
      chapter: 'communities/chapters/current',
    }),
  },
}
</script>
