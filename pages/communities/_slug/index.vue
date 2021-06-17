<template>
  <div class="relative">
    <MainHeaderSection />
    <Wrapper>
      <OverviewSection />
    </Wrapper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import OverviewSection from '@/components/sections/communities/overview'
import Wrapper from '@/components/sections/communities/Wrapper'

export default {
  components: {
    MainHeaderSection,
    OverviewSection,
    Wrapper,
  },
  layout: 'community',
  scrollToTop: true,
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
    }),
  },
}
</script>
