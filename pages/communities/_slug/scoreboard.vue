<template>
  <Section padding="py-0">
    <div class="lg:flex">
      <div class="hidden lg:block w-1/4 py-3 pr-4 md:py-14">
        <Navigation />
      </div>
      <div class="lg:hidden py-4 w-full lg:py-14">
        <MobileNav />
      </div>
      <div class="lg:w-3/4">
        <div
          class="
            py-4
            flex flex-col
            divide-y divide-solid divide-gray-200
            space-y-8
            text-gray-700
          "
        />
        <Header
          :title="community.name"
          :subtitle="$t('communities.navigation.scoreboard')"
        />
        <List />
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
import MobileNav from '@/components/sections/communities/MobileNav'
import Header from '@/components/sections/communities/partials/Header'
import List from '@/components/sections/communities/scoreboard/List'

export default {
  components: {
    MobileNav,
    Navigation,
    Header,
    Section,
    List,
  },
  scrollToTop: true,
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/content', params.slug)
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      community: 'communities/current',
    }),
  },
}
</script>
