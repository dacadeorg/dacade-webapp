<template>
  <Section :title="$t('communities.challenge.criteria.title')">
    <div
      v-for="(criteria, i) in community.challenge.ratingCriteria"
      :key="i"
      class="mt-8"
    >
      <span class="block text-sm capitalize font-medium">{{ criteria.name }}</span>
      <div class="grid grid-cols-4 mt-3 gap-x-5">
        <div v-for="(rubric, k) in criteria.rubric" :key="k" class="text-sm">
          <span
            class="block font-bold leading-normal"
            :style="{
              color: colors.textAccent
            }"
          >{{ rubric.points }} {{ $t('communities.challenge.criteria.points') }}</span>
          <span class="block leading-normal">{{ rubric.text }}</span>
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '../partials/Section.vue'

export default {
  name: 'RubricHeader',
  components: {
    Section
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors'
    })
  }
}
</script>
