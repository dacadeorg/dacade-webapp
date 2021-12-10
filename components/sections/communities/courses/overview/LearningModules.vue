<template>
  <Section
    :title="$t('communities.overview.learning-modules')"
    :title-bold="false"
  >
    <div
      v-for="(learningModule, i) in course.learningModules"
      :key="i"
      class="mt-4 md:mt-9"
    >
      <h4 class="font-medium inline-block text-.5xl">
        {{ learningModule.title }}
      </h4>
      <span
        v-if="learningModule.duration"
        class="text-xs font-semibold whitespace-nowrap"
        :style="{
          color: colors.textAccent,
        }"
        >{{ duration(learningModule.duration) }}</span
      >
      <ObjectiveList :objectives="learningModule.objectives" />
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/partials/Section.vue'
import ObjectiveList from '@/components/list/Objectives'
import DateManager from '@/utilities/DateManager'

export default {
  name: 'LearningModuleSection',
  components: {
    Section,
    ObjectiveList,
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
      colors: 'ui/colors',
    }),
  },
  methods: {
    duration(value) {
      if (!value) {
        return 0
      }
      return DateManager.humanize(value)
    },
  },
}
</script>
