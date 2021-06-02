<template>
  <Section v-if="materials && materials.length" :title="'Additional Material'">
    <a
      v-for="(item, i) in materials"
      :key="i"
      :href="material.link"
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
  </Section>
</template>
<script>
/* eslint-disable no-console */
import Section from '../partials/Section.vue'
import Duration from '../partials/Duration.vue'

export default {
  name: 'AdditionalMaterialSection',
  components: {
    Section,
    Duration,
  },
  props: {
    materials: {
      default: () => {
        return []
      },
      type: Array,
    },
  },
}
</script>
