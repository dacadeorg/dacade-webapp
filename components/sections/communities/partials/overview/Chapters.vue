<template>
  <Section :title="$t('communities.overview.chapter')" :title-bold="false">
    <div v-for="(chapter, i) in community.chapters" :key="i" class="mt-9">
      <h4 class="font-medium inline-block text-.5xl">
        {{ chapter.title }}
      </h4>
      <span
        v-if="chapter.duration"
        class="text-xs font-semibold"
        :style="{
          color: colors.textAccent
        }"
      >{{ duration(chapter.duration) }}</span>
      <ObjectiveList :objectives="chapter.objectives" />
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ObjectiveList from '@/components/list/Objectives'
import Moment from 'moment'
import Section from './Section.vue'

export default {
  name: 'ChapterSection',
  components: {
    Section,
    ObjectiveList
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors'
    })
  },
  methods: {
    duration (value) {
      if (!value) {
        return 0
      }
      return Moment.duration(value).humanize()
    }
  }
}
</script>
