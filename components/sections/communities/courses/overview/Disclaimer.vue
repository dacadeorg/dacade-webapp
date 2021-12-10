<template>
  <Section class="mt-0! pt-0!">
    <Hint v-if="course.disclaimer">
      <strong>{{ $t('communities.overview.info.disclaimer.title') }}:</strong>
      <span v-html="course.disclaimer" />
    </Hint>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/partials/Section.vue'
import Hint from '@/components/ui/Hint'

export default {
  name: 'DisclaimerSection',
  components: {
    Section,
    Hint,
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
    }),
  },
}
</script>
