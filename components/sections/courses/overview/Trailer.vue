<template>
  <Section
    v-if="course.trailer && course.trailer.video"
    :title="$t('communities.overview.trailer')"
  >
    <Duration
      class="-mt-1"
      :text="$t('communities.overview.trailer.video')"
      :value="course.trailer.duration"
    />
    <div class="block text-lg mt-3 mb-4.5">{{ course.trailer.summary }}</div>
    <Video class="-mx-0 md:w-full md:mx-auto" :url="course.trailer.video" />
    <div
      v-if="course.trailer.description"
      class="block text-lg mt-4 prose max-w-full"
      v-html="course.trailer.description"
    />
    <div v-if="course.trailer.info" class="prose pt-6 w-full max-w-full">
      <span class="block text-lg mt-2 prose">{{
        course.trailer.info.title
      }}</span>
      <ObjectiveList :objectives="course.trailer.info.items" />
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
import Duration from '@/components/sections/courses/_partials/Duration.vue'
import ObjectiveList from '@/components/list/Objectives'
import Video from '@/components/ui/Video'

export default {
  name: 'OverviewRewards',
  components: {
    Section,
    Duration,
    Video,
    ObjectiveList,
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
      colors: 'ui/colors',
    }),
  },
}
</script>
