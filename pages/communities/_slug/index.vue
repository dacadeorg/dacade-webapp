<template>
  <div class="relative">
    <MainHeaderSection />
    <FAQCard />
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
import FAQCard from '@/components/cards/Faq'

export default {
  components: {
    MainHeaderSection,
    OverviewSection,
    Wrapper,
    FAQCard,
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
