<template>
  <Wrapper>
    <div
      class="py-8 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
    >
      <Header />
      <div class="w-full divide-y divide-solid divide-gray-200">
        <MaterialSection
          v-for="(material, i) in materials"
          :key="i"
          :material="material"
        />
        <AdditionalMaterialsSection :materials="additionalMaterials" />
        <InteractiveModule
          v-if="interactiveModules.length"
          :data="interactiveModules[0]"
        />
        <PageNavigation />
      </div>
    </div>
  </Wrapper>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'
import PageNavigation from '@/components/sections/courses/PageNavigation.vue'
import Header from '@/components/sections/learning-modules/Header'
import InteractiveModule from '@/components/sections/learning-modules/InteractiveModule'
import MaterialSection from '@/components/sections/learning-modules/Material'
import AdditionalMaterialsSection from '@/components/sections/learning-modules/AdditionalMaterials'
import Wrapper from '@/components/sections/courses/Wrapper'
import { getMetadataDescription, getMetadataTitle } from '~/utilities/Metadata'

export default {
  components: {
    Wrapper,
    Header,
    MaterialSection,
    PageNavigation,
    AdditionalMaterialsSection,
    InteractiveModule,
  },
  scrollToTop: true,
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/find', params.course_slug),
      store.dispatch('communities/courses/learningModules/find', params.id),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.learningModule?.title, this.course?.name),
      meta: getMetadataDescription(this.learningModule?.description),
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      course: 'communities/courses/current',
      learningModule: 'communities/courses/learningModules/current',
    }),
    materials() {
      if (!this.learningModule?.materials) return []

      return this.learningModule.materials.filter(
        (material) => material.type !== 'ADDITIONAL'
      )
    },
    additionalMaterials() {
      if (!this.learningModule?.materials) return []

      return this.learningModule.materials.filter(
        (material) => material.type === 'ADDITIONAL'
      )
    },
    interactiveModules() {
      if (!this.learningModule?.interactiveModules) return []

      return this.learningModule?.interactiveModules
    },
  },
}
</script>
