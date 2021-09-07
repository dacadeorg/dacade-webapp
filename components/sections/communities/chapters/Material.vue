<template>
  <Section
    v-if="material.type"
    :title="isAdditional ? 'Additional Material' : material.title"
  >
    <Duration
      v-if="!isAdditional"
      :text="material.subtitle"
      :value="material.duration"
    />
    <span v-if="!isAdditional" class="block text-lg">{{
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
        <p class="text-lg font-normal leading-normal">
          {{ material.title }}
        </p>
        <span class="ml-2 leading-normal">
          <Duration :value="material.duration" />
        </span>
      </a>
    </div>
    <a
      v-if="
        (material.type === 'TEXT' || material.type === 'ARTICLE') &&
        material.link
      "
      :href="material.link"
      target="__blank"
      class="mt-4 block"
    >
      <Button
        :padding="false"
        class="action-button py-2 px-5"
        :custom-style="outlineButtonStyles"
        type="outline-primary"
      >
        <span class="flex text-left items-center text-sm pr-6">
          {{ material.type === 'TEXT' ? 'Open Lesson' : 'Open Article' }}
          <span class="absolute right-5 w-3"><ArrowRightIcon /></span>
        </span>
      </Button>
    </a>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
// import RewardsSection from './partials/overview/Rewards'
import Section from '../partials/Section.vue'
import Duration from '../partials/Duration.vue'
import Markdown from '../partials/Markdown.vue'
import Button from '@/components/ui/Button'
import Video from '@/components/ui/Video'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'MaterialSection',
  components: {
    Section,
    Duration,
    Video,
    Markdown,
    Button,
    ArrowRightIcon,
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
      chapter: 'communities/chapters/current',
    }),
    isAdditional() {
      return this.material.type === 'ADDITIONAL'
    },
    outlineButtonStyles() {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.textAccent,
        '--button-border-color--hover': this.colors.textAccent,
      }
    },
  },
}
</script>
