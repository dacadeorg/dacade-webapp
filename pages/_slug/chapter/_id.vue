<template>
  <div>
    {{ chapterData }}
    {{ chapterLength }}
    <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: chapterPath($route.params) }">
      {{ nextChapterLinkText }}
    </nuxt-link>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
export default {
  props: {
    chapterData: {
      type: Object,
      required: true
    },
    chapterLength: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      nextChapterLinkText: 'Next chapter'
    }
  },
  methods: {
    chapterPath(params) {
      const newParams = parseInt(params.id, 10) + 1
      if (newParams < this.chapterLength) {
        return `/${params.slug}/chapter/${newParams}`
      } else {
        this.nextChapterLinkText = 'Next: Challenge'
        return `/${params.slug}/challenge/`
      }
    }
  }
}
</script>
