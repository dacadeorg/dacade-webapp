<template>
  <Wrapper>
    <div
      class="
        py-8
        flex flex-col
        divide-y divide-solid divide-gray-200
        space-y-8
        text-gray-700
      "
    >
      <Header />
      <MaterialSection
        v-for="(material, i) in materials"
        :key="i"
        :material="material"
      />
      <AdditionalMaterialsSection :materials="additionalMaterials" />
      <PageNavigation />
    </div>
  </Wrapper>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'
import PageNavigation from '@/components/sections/communities/PageNavigation.vue'
import Header from '@/components/sections/communities/chapters/Header'
import MaterialSection from '@/components/sections/communities/chapters/Material'
import AdditionalMaterialsSection from '@/components/sections/communities/chapters/AdditionalMaterials'
import Wrapper from '@/components/sections/communities/Wrapper'

export default {
  components: {
    Wrapper,
    Header,
    MaterialSection,
    PageNavigation,
    AdditionalMaterialsSection,
  },
  scrollToTop: true,
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/chapters/find', params.id)
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      community: 'communities/current',
      chapter: 'communities/chapters/current',
    }),
    materials() {
      if (!this.chapter?.materials) return []

      return this.chapter.materials.filter(
        (material) => material.type !== 'ADDITIONAL'
      )
    },
    additionalMaterials() {
      if (!this.chapter?.materials) return []

      return this.chapter.materials.filter(
        (material) => material.type === 'ADDITIONAL'
      )
    },
  },
}
</script>
