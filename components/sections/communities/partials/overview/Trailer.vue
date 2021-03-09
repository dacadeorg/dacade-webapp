<template>
  <Section v-if="community.trailer" :title="$t('communities.trailer')">
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
import Section from './Section.vue'

export default {
  name: 'OverviewRewards',
  components: {
    Section
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content'
    })
  }
}
</script>
