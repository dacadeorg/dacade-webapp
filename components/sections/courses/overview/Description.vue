<template>
  <div
    class="text-lg px-0 pt-9 py-2 md:hidden leading-snug tracking-onepercent pb-8 mb-0 border-b-2 md:border-b-0"
  >
    {{ htmlTagsCleanup(course.description || course.summary || '') }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OverviewDescription',
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
    }),
  },
  methods: {
    htmlTagsCleanup(value) {
      return value.replace(
        /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g,
        ''
      )
    },
  },
}
</script>
