<template>
  <div>
    <div class="text-sm relative pt-4 py-4 md:pt-7 lg:border-0 border-b-2">
      <span class="flex">
        <nuxt-link :to="localePath(path)">
          <div class="text-gray-500">{{ community.name }}</div>
        </nuxt-link>

        <div class="px-0.5">
          <ChevronRightIcon class="w-3" />
        </div>
        <div class="font-medium">{{ course.name }}</div>
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'
export default {
  components: {
    ChevronRightIcon,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      course: 'communities/courses/current',
    }),
    path() {
      return `/communities/${this.community.slug}`
    },
    submissions() {
      if (this.community.metadata && this.community.metadata.submissions) {
        return this.community.metadata.submissions
      }
      return 0
    },
    feedbacks() {
      if (this.community.metadata && this.community.metadata.feedbacks) {
        return this.community.metadata.feedbacks
      }
      return 0
    },
  },
}
</script>
