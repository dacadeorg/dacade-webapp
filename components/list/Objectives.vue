<template>
  <div
    v-if="objectives"
    class="
      flex flex-row
      xl:flex-nowrap
      flex-wrap
      gap-3
      sm:gap-5
      pt-3
      sm:pt-5 sm:pb-2 sm:mb-2
    "
  >
    <Objective
      v-for="(objective, i) in objectives"
      :key="i"
      :crossmark="crossmark"
      :objective="objective"
      :iconcolor="iconcolor"
    />
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Objective from '@/components/cards/Objective'

export default {
  name: 'ObjectiveList',
  components: {
    Objective,
  },
  props: {
    iconcolor: {
      type: String,
      default: '',
    },
    crossmark: {
      type: Boolean,
      default: false,
    },
    objectives: {
      type: Array,
      default: () => [],
    },

    feedback: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors',
    }),
  },
}
</script>
