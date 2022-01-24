<template>
  <div class="pb-2">
    <div>
      <h1
        class="text-4xl md:text-5xl leading-none text-gray-900"
        :class="hideTitleOnMobile ? 'hidden md:flex' : ''"
      >
        {{ course.name }}
      </h1>
      <p
        v-if="course.description"
        class="
          lg:w-7/12
          my-2
          md:my-5
          text-base
          md:text-.5xl
          w-full
          md:w-10/12
          leading-loose
          md:leading-snug
          text-gray-700
        "
      >
        {{ course.description }}
      </p>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  name: 'OverviewHeader',
  components: {},
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
    }),
  },
}
</script>
