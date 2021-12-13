<template>
  <Section
    :title="!hideTitle ? $t('communities.challenge.criteria.title') : ''"
  >
    <div v-for="(criteria, i) in ratingCriteria" :key="i" class="mt-8">
      <span class="block text-sm capitalize font-medium">{{
        criteria.name
      }}</span>
      <div
        class="
          grid grid-cols-1
          space-y-4
          md:space-y-0 md:grid-cols-2
          lg:grid-cols-4
          mt-3
          gap-y-5 gap-x-5
        "
      >
        <div v-for="(rubric, k) in criteria.rubric" :key="k" class="text-sm">
          <div
            :class="
              selected.length && !selectedRubric(rubric.id)
                ? 'opacity-40'
                : 'relative'
            "
          >
            <span
              v-if="selectedRubric(rubric.id)"
              class="absolute -left-6 top-1 w-3"
              fill="currentColor"
              :style="{
                color: colors.textAccent,
              }"
              ><Checkmark
            /></span>
            <span
              class="block font-bold leading-normal"
              :style="{
                color: colors.textAccent,
              }"
              >{{
                selectedRubric(rubric.id)
                  ? selectedRubric(rubric.id).points
                  : rubric.points
              }}
              {{ $t('communities.challenge.criteria.points') }}</span
            >
            <span class="block leading-normal">{{ rubric.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
import Checkmark from '~/assets/icons/checkmark.svg?inline'

export default {
  name: 'RubricHeader',
  components: {
    Section,
    Checkmark,
  },
  props: {
    ratingCriteria: {
      type: Array,
      default: () => [],
    },
    selected: {
      default: () => [],
      type: Array,
    },
    hideTitle: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors',
    }),
  },
  methods: {
    selectedRubric(id) {
      return this.selected.find((rubric) => rubric.id === id)
    },
  },
}
</script>
