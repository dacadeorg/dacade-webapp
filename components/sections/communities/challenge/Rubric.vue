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
          md:space-y-0
          md:grid-cols-2
          lg:grid-cols-4
          mt-3
          gap-y-5 gap-x-5
        "
      >
        <div v-for="(rubric, k) in criteria.rubric" :key="k" class="text-sm">
          <div
            :class="
              selected.length && !selected.includes(rubric.ref)
                ? 'opacity-40'
                : ''
            "
          >
            <span
              class="block font-bold leading-normal"
              :style="{
                color: colors.textAccent,
              }"
              >{{ rubric.points }}
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
import Section from '../partials/Section.vue'

export default {
  name: 'RubricHeader',
  components: {
    Section,
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
  created() {
    console.log(this.$router)
  },
}
</script>
