<template>
  <Section v-if="community.trailer" :title="$t('communities.overview.trailer')">
    <Duration
      :text="$t('communities.overview.trailer.video')"
      :value="community.trailer.duration"
    />
    <span class="block text-lg">{{ community.trailer.summary }}</span>
    <Video :url="community.trailer.video" />
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
    Video
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content',
      colors: 'ui/colors'
    })
  }
}
</script>
