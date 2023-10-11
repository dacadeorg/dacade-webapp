<template>
  <Section>
    <div class="flex justify-between cursor-pointer" @click="toggleAccordion()">
      <H3>Learn</H3>
      <div>
        <span><ArrowDown /></span>
      </div>
    </div>
    <div v-show="isOpen">
      <div class="text-base font-normal text-slate-700 pt-12 pb-7 md:w-99">
        The following learning materials will equip you with the technical
        expertise required to successfully address the challenge.
      </div>
      <div class="md:flex flex-row gap-3">
        <LearningCard />
        <LearningCard />
      </div>
      <div class="flex flex-row gap-3 overflow-hidden">
        <RelatedLearningCard />
        <RelatedLearningCard />
        <RelatedLearningCard />
      </div>
    </div>
  </Section>
</template>

<script>
import Section from '@/components/sections/communities/_partials/Section'
import H3 from '~/components/ui/text/H3'
import RelatedLearningCard from '@/components/cards/challenge/_partials/RelatedLearning'
import LearningCard from '@/components/cards/challenge/_partials/Learning'
import ArrowDown from '~/assets/icons/down-icon-arrow.svg?inline'
export default {
  name: 'Learning',
  components: {
    Section,
    ArrowDown,
    H3,
    LearningCard,
    RelatedLearningCard,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    toggleAccordion() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
