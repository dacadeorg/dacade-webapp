<template>
  <div class="relative">
    <MainHeaderSection />
    <Section>
      <div
        class="w-full lg:w-3/4 mx-auto divide-y divide-solid divide-gray-500"
      >
        <Courses />
        <Scoreboard />
      </div>
    </Section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import Scoreboard from '@/pages/communities/_slug/scoreboard.vue'
import Courses from '@/pages/communities/_slug/courses-overview.vue'
import Section from '@/components/sections/communities/_partials/Section.vue'

export default {
  components: {
    MainHeaderSection,
    Section,
    Scoreboard,
    Courses,
  },
  layout: 'community',
  scrollToTop: true,
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/all', params.slug),
      store.dispatch('communities/scoreboard/all', params.slug),
    ]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      courses: 'communities/courses/list',
      scoreboard: 'communities/scoreboard/list',
    }),
  },
}
</script>
