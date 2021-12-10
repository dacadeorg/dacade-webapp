<template>
  <Section
    v-if="course.challenge"
    :title="$t('communities.overview.challenge')"
  >
    <span class="block text-base md:text-lg font-normal mt-3">{{
      course.challenge.description
    }}</span>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/partials/Section.vue'

export default {
  name: 'OverviewChallenge',
  components: {
    Section,
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
    }),
  },
}
</script>
