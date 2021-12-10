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
        <ScoreboardCard
          v-for="(item, i) in scoreboard"
          :key="i"
          :index="i + 1"
          :value="item"
        />
      </div>
    </Section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import ScoreboardCard from '@/components/cards/Scoreboard'
import Section from '@/components/sections/communities/partials/Section.vue'

export default {
  components: {
    MainHeaderSection,
    ScoreboardCard,
    Section,
  },
  layout: 'community',
  scrollToTop: true,
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/all', params.slug),
      store.dispatch('communities/scoreboard/all', params.slug),
    ])
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
