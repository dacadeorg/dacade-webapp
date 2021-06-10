<template>
  <Section :title="isAdditional ? 'Additional Material' : material.title">
    <a :href="material.link" target="__blank">
      <Duration
        v-if="!isAdditional"
        :text="material.subtitle"
        :value="material.duration"
      />
      <span v-if="!isAdditional" class="block text-lg">{{
        material.description
      }}</span>
    </a>

    <Video v-if="material.type === 'EMBEDDED-VIDEO'" :url="material.link" />
    <Markdown v-if="material.type === 'MARKDOWN'" :url="material.link" />
    <div v-if="isAdditional">
      <a
        v-for="(item, i) in material.list"
        :key="i"
        :href="item.link"
        target="__blank"
        class="mt-3 flex flex-wrap items-center"
      >
        <p class="text-lg font-normal leading-normal">
          {{ material.title }}
        </p>
        <span class="ml-2 leading-normal">
          <Duration :value="material.duration" />
        </span>
      </a>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import Video from '@/components/ui/Video'
import Section from '../partials/Section.vue'
import Duration from '../partials/Duration.vue'
import Markdown from '../partials/Markdown.vue'

export default {
  name: 'MaterialSection',
  components: {
    Section,
    Duration,
    Video,
    Markdown,
  },
  props: {
    material: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content',
      chapter: 'communities/chapters/current',
    }),
    isAdditional() {
      return this.material.type === 'ADDITIONAL'
    },
  },
}
</script>
