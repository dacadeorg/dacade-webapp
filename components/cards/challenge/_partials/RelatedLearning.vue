<template>
  <div
    class="flex flex-col relative md:w-4/12 p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200"
  >
    <div class="flex flex-col justify-between w-full sm:pb-0">
      <div class="flex flex-col">
        <div class="text-base font-medium leading-normal text-gray-900">
          Related learning material
        </div>
        <div class="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">
          In this course, you will learn the most important blockchain concepts
          that you will need to navigate the Celo ecosystem.
        </div>
      </div>
      <div class="">
        <nuxt-link :to="localePath(path)">
          <ArrowButton
            :community-styles="true"
            type="outline-primary"
            class="font-medium text-sm"
          >
            {{ $t('course.challenge.button') }}
          </ArrowButton>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ArrowButton from '@/components/ui/button/Arrow'

export default {
  name: 'RelatedLearningCard',
  components: {
    ArrowButton,
  },

  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    path() {
      return `/communities/`
    },
  },
}
</script>
