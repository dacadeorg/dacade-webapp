<template>
  <Section
    v-if="community.trailer && community.trailer.video"
    :title="$t('communities.overview.trailer')"
  >
    <Duration
      class="-mt-1"
      :text="$t('communities.overview.trailer.video')"
      :value="community.trailer.duration"
    />
    <div class="block text-lg mt-3 mb-4.5">{{ community.trailer.summary }}</div>
    <Video class="-mx-0 md:w-full md:mx-auto" :url="community.trailer.video" />
    <div
      v-if="community.trailer.description"
      class="block text-lg mt-4 prose max-w-full"
      v-html="community.trailer.description"
    />
    <div v-if="community.trailer.info" class="prose pt-6 w-full max-w-full">
      <span class="block text-lg mt-2 prose">{{
        community.trailer.info.title
      }}</span>
      <ObjectiveList :objectives="community.trailer.info.items" />
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '../_partials/Section.vue'
import Duration from '../_partials/Duration.vue'
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
      community: 'communities/current',
      communityData: 'communities/content',
      colors: 'ui/colors',
    }),
  },
}
</script>
