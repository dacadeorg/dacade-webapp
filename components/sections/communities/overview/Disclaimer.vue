<template>
  <Section class="mt-0! pt-0!">
    <Hint v-if="community.disclaimer">
      <strong>{{ $t('communities.overview.info.disclaimer.title') }}:</strong>
      <span v-html="community.disclaimer" />
    </Hint>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '../_partials/Section.vue'
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
