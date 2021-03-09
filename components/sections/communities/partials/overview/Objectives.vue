<template>
  <Section :title="'Learning objective'" :subtitle="'After finishing the learning materials you will'">
    <div v-if="community.objectives" class="grid grid-cols-3 space-x-5 py-7">
      <div v-for="(objective, i) in community.objectives" :key="i" class="flex">
        <div class="mr-2 pt-px mt-px">
          <Checkmark />
        </div>
        <div class="text-sm text-gray-700 leading-5">
          {{ objective }}
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from './Section.vue'
import Checkmark from '~/assets/icons/checkmark.svg?inline'

export default {
  name: 'OverviewSection',
  components: {
    Section,
    Checkmark
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    })
  }
}
</script>
