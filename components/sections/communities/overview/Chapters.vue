<template>
  <Section :title="$t('communities.overview.chapter')" :title-bold="false">
    <div
      v-for="(chapter, i) in community.chapters"
      :key="i"
      class="mt-4 md:mt-9"
    >
      <h4 class="font-medium inline-block text-.5xl">
        {{ chapter.title }}
      </h4>
      <span
        v-if="chapter.duration"
        class="text-xs font-semibold whitespace-nowrap"
        :style="{
          color: colors.textAccent,
        }"
        >{{ duration(chapter.duration) }}</span
      >
      <ObjectiveList :objectives="chapter.objectives" />
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '../partials/Section.vue'
import ObjectiveList from '@/components/list/Objectives'
import DateManager from '@/utilities/DateManager'

export default {
  name: 'ChapterSection',
  components: {
    Section,
    ObjectiveList,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
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
