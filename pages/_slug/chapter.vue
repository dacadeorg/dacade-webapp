<template>
  <div>
    <nuxt-child :chapter-data="chapterData($route.params)" :chapter-length="chapterLength($route.params)" />
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    chapterData(params) {
      return this.communityData.ChapterData[params.id]
    },
    chapterLength(params) {
      return this.communityData.ChapterData.length
    }
  }
}
</script>
