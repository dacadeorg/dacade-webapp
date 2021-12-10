<template>
  <Section
    v-if="community.prerequisite"
    :title="$t('communities.overview.info.prerequisite.title')"
    :subtitle="$t('communities.overview.info.prerequisite.subtitle')"
  >
    <div class="mb-5">
      <ObjectiveList :objectives="community.prerequisite.items" />
    </div>
    <Hint v-if="community.prerequisite.hint">
      <span v-html="community.prerequisite.hint" />
    </Hint>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/partials/Section.vue'
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
      community: 'communities/current',
    }),
  },
}
</script>
