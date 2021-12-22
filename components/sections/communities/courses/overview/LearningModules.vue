<template>
  <Section>
    <div class="flex flex-wrap">
      <div class="mt-0 md:mt-4 mr-4 flex flex-col w-2/5">
        <h4 class="pl-2 font-medium inline-block text-.5xl">
          {{ $t('communities.overview.learning-modules') }}
        </h4>
        <span class="text-sm mt-4 px-2 mb-2 rounded-3xl max-w-xs">{{
          $t('communities.overview.learning-modules-description')
        }}</span>
      </div>
      <div
        v-for="(learningModule, i) in course.learningModules"
        :key="i"
        class="
          mt-4
          md:mt-4
          mx-2
          p-5
          bg-gray-50
          rounded-3xl
          flex flex-col
          w-2/5
          border-solid border-2 border-gray-200
        "
      >
        <h4 class="font-medium inline-block text-xl">
          {{ learningModule.title }}
        </h4>
        <span
          v-if="learningModule.duration"
          class="text-xxs mt-4 px-2 mb-2 bg-gray-200 rounded-3xl max-w-max"
          >{{ duration(learningModule.duration) }}</span
        >
        <!-- <Button @click="debug" /> -->
        <span
          v-if="learningModule.description"
          class="text-sm mt-4 px-2 mb-2 rounded-3xl max-w-max"
          >{{ learningModule.description }}</span
        >
        <!-- <ObjectiveList :objectives="learningModule.objectives" /> -->
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
// import ObjectiveList from '@/components/list/Objectives'
import DateManager from '@/utilities/DateManager'

export default {
  name: 'LearningModuleSection',
  components: {
    Section,
    // ObjectiveList,
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
