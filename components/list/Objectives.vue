<template>
  <div v-if="objectives" class="grid grid-cols-1  md:grid-cols-3 space-y-3 py-2 md:space-y-0 lg:space-x-5  md:pt-5 md:pb-0 md:mb-0">
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
    Objective
  },
  props: {
    iconcolor: {
      type: String,
      default: ''
    },
    crossmark: {
      type: Boolean,
      default: false
    },
    objectives: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors'
    })
  }
}
</script>
