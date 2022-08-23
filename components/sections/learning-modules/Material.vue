<template>
  <Section
    v-if="material.type"
    :id="materialId"
    :title="isAdditional ? 'Additional Material' : material.title"
  >
    <Duration
      v-if="!isAdditional"
      :text="material.subtitle"
      :value="material.duration"
    />
    <span v-if="!isAdditional" class="block text-lg mb-6 mt-2">{{
      material.description
    }}</span>

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
        <p
          :id="sluggify(material.title)"
          class="text-lg font-normal leading-normal"
        >
          {{ material.title }}
        </p>
        <span class="ml-2 leading-normal">
          <Duration :value="material.duration" />
        </span>
      </a>
    </div>
    <ArrowButton
      v-if="
        (material.type === 'TEXT' || material.type === 'ARTICLE') &&
        material.link
      "
      :link="material.link"
      target="__blank"
      class="mt-4 block"
      :community-styles="true"
      type="outline-primary"
    >
      {{
        material.type === 'TEXT'
          ? $t('learning-module.material.open.lesson')
          : $t('learning-module.material.open.article')
      }}
    </ArrowButton>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import Slugger from 'github-slugger'
import Markdown from './_partials/Markdown.vue'
import Section from '@/components/sections/communities/_partials/Section.vue'
import Duration from '@/components/sections/courses/_partials/Duration.vue'
import ArrowButton from '@/components/ui/button/Arrow'
import Video from '@/components/ui/Video'

export default {
  name: 'MaterialSection',
  components: {
    Section,
    Duration,
    Video,
    Markdown,
    ArrowButton,
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
      colors: 'ui/colors',
      community: 'communities/current',
      communityData: 'communities/content',
    }),
    isAdditional() {
      return this.material.type === 'ADDITIONAL'
    },
    materialId() {
      if (!this.material.title || this.isAdditional) return
      return this.sluggify(this.material.title)
    },
  },
  methods: {
    sluggify(text) {
      const slugger = new Slugger()
      return slugger.slug(text)
    },
  },
}
</script>
