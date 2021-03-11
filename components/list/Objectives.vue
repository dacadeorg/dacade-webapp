<template>
  <div v-if="objectives" class="grid grid-cols-3 space-x-5 py-7">
    <Objective
      v-for="(objective, i) in objectives"
      :key="i"
      :objective="objective"
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
