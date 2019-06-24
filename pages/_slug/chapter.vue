<template>
  <div>
    <nuxt-child :chapter-data="chapterData($route.params)" />
  </div>
</template>
<script>
export default {
/* eslint-disable no-console */
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
      return this.communityData.chapter[params.id]
    }
  }
}
</script>
