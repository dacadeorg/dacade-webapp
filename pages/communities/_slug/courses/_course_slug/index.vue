<template>
  <div class="relative">
    <FAQCard />
    <Wrapper>
      <OverviewSection />
    </Wrapper>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import OverviewSection from '@/components/sections/communities/courses/overview'
import Wrapper from '@/components/sections/communities/courses/Wrapper'
import FAQCard from '@/components/cards/Faq'

export default {
  components: {
    OverviewSection,
    Wrapper,
    FAQCard,
  },
  layout: 'community',
  scrollToTop: true,
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/find', params.course_slug),
    ])
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      course: 'communities/courses/current',
    }),
  },
}
</script>
