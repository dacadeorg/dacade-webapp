<template>
  <Section>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-wrap">
      <div class="mt-0 md:pt-4 mr-4 flex w-full flex-col">
        <h4 class="pl-2 font-medium inline-block text-.5xl">
          {{ $t('communities.overview.learning-modules') }}
        </h4>
        <span class="text-sm mt-4 px-2 mb-2 rounded-3xl max-w-xs">{{
          $t('communities.overview.learning-modules-description')
        }}</span>
      </div>
      <LearningModuleCard
        v-for="(learningModule, i) in course.learningModules"
        :key="i"
        :learning-module="learningModule"
      />
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
import DateManager from '@/utilities/DateManager'
import LearningModuleCard from '@/components/cards/Learning.vue'

export default {
  name: 'LearningModuleSection',
  components: {
    Section,
    LearningModuleCard,
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
    debug(event) {
      console.log('learning module', this.course.learningModules)
    },
  },
}
</script>
