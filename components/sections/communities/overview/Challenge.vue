<template>
  <Section
    v-if="community.challenge"
    :title="$t('communities.overview.challenge')"
  >
    <span class="block text-base md:text-lg font-normal mt-3">{{
      community.challenge.description
    }}</span>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '../_partials/Section.vue'

export default {
  name: 'OverviewChallenge',
  components: {
    Section,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
    }),
  },
}
</script>
