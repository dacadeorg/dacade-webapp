<template>
  <Section :custom-color="community.colors.primary" padding="py-24">
    <div
      class="relative flex"
      :style="{
        color: community.colors.text
      }"
    >
      <div class="w-6/12 flex flex-col justify-between">
        <div class="relative">
          <h1 class="text-7.75xl leading-none mb-5 font-normal">
            {{ community.name }}
          </h1>
          <span class="text-.5xl leading-snug">
            {{ community.description || community.summary }}
          </span>
        </div>
        <div class="relative flex divide-x divide-current leading-loose mt-24">
          <span
            class="block py-1 px-3"
          >{{ community.submissions }}
            {{ $t('communities.submissions') }}</span>
          <span
            class="block py-1 px-3"
          >{{ communityData.totalFeedback || 0 }} {{ $t('communities.feedbacks') }}</span>
        </div>
      </div>
      <div class="w-4/12 text-right ml-auto">
        <img :src="community.icon" class="w-full">
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '../../ui/Section.vue'

export default {
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
