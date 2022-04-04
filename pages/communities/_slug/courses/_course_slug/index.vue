<template>
  <Wrapper>
    <div
      v-scroll-spy="{ offset: -300 }"
      class="py-8 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
    >
      <OverviewSection />
    </div>
  </Wrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import OverviewSection from '@/components/sections/courses/overview'
import Wrapper from '@/components/sections/courses/Wrapper'

export default {
  components: {
    OverviewSection,
    Wrapper,
  },
  scrollToTop: true,
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/find', params.course_slug),
    ]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      course: 'communities/courses/current',
    }),
  },
}
</script>
