<template>
  <Section v-if="community.trailer" :title="$t('communities.overview.trailer')">
    <span v-if="duration" class="text-sm text-gray-500"><span
      :style="{
        color: colors.textAccent
      }"
    >{{ duration }}</span> {{ $t('communities.overview.trailer.videor') }}</span>
    <span class="block text-lg">{{ community.trailer.summary }}</span>
    <div
      class="w-full relative mt-7"
      :style="{
        paddingTop: '50%'
      }"
    >
      <iframe
        class="w-full h-full absolute top-0"
        :src="community.trailer.video"
        allowfullscreen="allowfullscreen"
        frameborder="0"
      />
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Moment from 'moment'
import Section from './Section.vue'

export default {
  name: 'OverviewRewards',
  components: {
    Section
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content',
      colors: 'ui/colors'
    }),
    duration () {
      if (!this.community?.trailer?.duration) {
        return 0
      }
      return Moment.duration(this.community.trailer.duration).humanize()
    }
  }
}
</script>
