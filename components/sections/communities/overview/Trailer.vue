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
    <span class="block text-lg pt-2">{{ community.trailer.summary }}</span>
    <Video
      class="w-screen h-full -ml-5 md:w-full md:mx-auto"
      :url="community.trailer.video"
    />
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Video from '@/components/ui/Video'
import Section from '../partials/Section.vue'
import Duration from '../partials/Duration.vue'

export default {
  name: 'OverviewRewards',
  components: {
    Section,
    Duration,
    Video,
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
