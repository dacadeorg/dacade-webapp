<template>
  <Section v-if="materials && materials.length" :title="'Additional Material'">
    <a
      v-for="(material, i) in materials"
      :key="i"
      :href="material.link"
      target="__blank"
      class="mt-3 flex flex-wrap items-center"
    >
      <p
        :id="sluggify(material.title)"
        class="text-lg font-normal leading-normal"
      >
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
import Slugger from 'github-slugger'
import Section from '@/components/sections/communities/_partials/Section.vue'
import Duration from '@/components/sections/communities/courses/_partials/Duration.vue'

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
  methods: {
    sluggify(text) {
      const slugger = new Slugger()
      return slugger.slug(text)
    },
  },
}
</script>
