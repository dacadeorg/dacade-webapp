<template>
  <div class="relative">
    <MainHeaderSection />
    <Section>
      <div class="w-full lg:w-3/4 mx-auto">
        <div
          v-for="course in courses"
          :key="course.id"
          class="relative py-8 w-full bg-black text-white"
        >
          <nuxt-link
            class="text-white"
            :to="$navigation.community.coursePath('', course.slug)"
            >{{ course.name }}</nuxt-link
          >
        </div>
        <Scoreboard />
      </div>
    </Section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import Scoreboard from '@/pages/communities/_slug/scoreboard.vue'
import Section from '@/components/sections/communities/_partials/Section.vue'

export default {
  components: {
    MainHeaderSection,
    Section,
    Scoreboard,
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
