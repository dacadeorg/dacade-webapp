<template>
  <Section padding="p-0">
    <div class="lg:flex">
      <div class="hidden lg:block w-1/4 py-3 pr-4 lg:py-14">
        <Navigation />
      </div>
      <div class="lg:hidden py-4 w-full lg:py-14">
        <MobileNav />
      </div>
      <div class="lg:w-3/4">
        <div class="py-4 flex flex-col space-y-8 text-gray-700">
          <Header
            :title="community.name"
            :subtitle="$t('communities.submission.title')"
          />
          <List />
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Navigation from '@/components/sections/communities/Navigation'
import Section from '@/components/ui/Section'

import Header from '@/components/sections/communities/partials/Header'
import List from '@/components/sections/communities/submissions/List'
import MobileNav from '@/components/sections/communities/MobileNav'

export default {
  components: {
    MobileNav,
    Navigation,
    Section,
    Header,
    List,
  },
  scrollToTop: true,
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/submissions/all', params.slug)
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      submissions: 'communities/submissions/list',
    }),
  },
}
</script>
