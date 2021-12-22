<template>
  <Section
    v-if="course.prerequisite"
    :title="$t('communities.overview.info.prerequisite.title')"
    :subtitle="$t('communities.overview.info.prerequisite.subtitle')"
  >
    <div class="mb-5">
      <ObjectiveList :objectives="course.prerequisite.items" />
    </div>
    <Hint v-if="course.prerequisite.hint">
      <span v-html="course.prerequisite.hint" />
    </Hint>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
import ObjectiveList from '@/components/list/Objectives'
import Hint from '@/components/ui/Hint'

export default {
  name: 'PrerequisiteSection',
  components: {
    Section,
    ObjectiveList,
    Hint,
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
    }),
  },
}
</script>
