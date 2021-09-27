<template>
  <Section>
    <Hint v-if="community.disclaimer">
      <strong>{{ $t('communities.overview.info.disclaimer.title') }}:</strong>
      <span>{{ community.disclaimer }}</span>
    </Hint>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '../partials/Section.vue'
import Hint from '@/components/ui/Hint'

export default {
  name: 'DisclaimerSection',
  components: {
    Section,
    Hint,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
    }),
  },
}
</script>
