<template>
  <div
    v-if="objectives"
    class="
      flex flex-col
      gap-y-3
      md:grid md:grid-cols-3 md:gap-x-3 md:items-stretch
      pt-2
      md:pt-5 md:pb-2 md:mb-2
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
