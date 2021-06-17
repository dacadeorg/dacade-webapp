<template>
  <Section
    v-if="community.disclaimer"
    :title="$t('communities.overview.info.disclaimer.title')"
    ><span class="block text-lg pt-2">{{ community.disclaimer }}</span>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '../partials/Section.vue'

export default {
  name: 'DisclaimerSection',
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
