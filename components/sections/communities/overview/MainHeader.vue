<template>
  <Section class="bg-theme-primary text-theme-text">
    <div class="max-w-3xl px-5 py-8 mx-auto lg:max-w-7xl sm:py-10 sm:px-10">
      <div class="flex flex-col justify-between lg:flex-row">
        <div class="max-w-md mb-4 md:max-w-md lg:max-w-lg xl:max-w-xl lg:mr-6">
          <h1 class="text-5xl tracking-tight sm:text-6xl xl:text-7xl max-w-text-xs">
            {{ community.name }}
          </h1>
          <p class="mt-2 text-xl leading-tight max-w-text-sm lg:hidden">
            {{ htmlTagsCleanup(community.summary) }}
          </p>
          <p class="hidden mt-4 text-lg xl:text-2xl max-w-text-md lg:block">
            {{ htmlTagsCleanup(community.description || community.summary) }}
          </p>
        </div>
        <div class="self-end w-1/2 max-w-md">
          <img :src="community.icon" class="relative w-full aspect-w-1 aspect-h-1">
        </div>
      </div>
      <div class="flex flex-col max-w-xs xl:-mt-2 md:max-w-xl md:flex-row md:items-center">
        <div class="flex h-10 mr-5 ">
          <img class="w-10 h-10 -mr-3 border-2 rounded-full border-theme-secondary" src="~assets/img/testimonial-sample-2.png" alt="">
          <img class="w-10 h-10 -mr-3 border-2 rounded-full border-theme-secondary" src="~assets/img/testimonial-sample-5.png" alt="">
          <img class="w-10 h-10 -mr-3 border-2 rounded-full border-theme-secondary" src="~assets/img/testimonial-sample-2.png" alt="">
        </div>
        <div class="my-2 text-sm">
          <span><strong>48</strong> Submissions</span>
          <span class="p-2 md:border-l md:ml-2"><strong>157</strong> Feedbacks</span>
          <div />
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '@/components/ui/Section'

export default {
  components: {
    Section
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      communityData: 'communities/content'
    })
  },
  methods: {
    htmlTagsCleanup (value) {
      return value.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, '')
    }
  }
}
</script>
