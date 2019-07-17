<template>
  <div>
    {{ lcData.ChapterData[$route.params.id].chapterDescription }}
    <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: chapterPath($route.params) }">
      {{ nextChapterLinkText }}
    </nuxt-link>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      nextChapterLinkText: 'Next chapter'
    }
  },
  middleware: 'verify-user',
  computed: {
    ...mapGetters({
      lcData: 'content/lcData'
    })
  },
  methods: {
    chapterPath(params) {
      const newParams = parseInt(params.id, 10) + 1
      if (newParams < this.lcData.ChapterData.length) {
        return `/${params.slug}/chapter/${newParams}`
      } else {
        this.nextChapterLinkText = 'Next: Challenge'
        return `/${params.slug}/challenge/`
      }
    }
  }
}
</script>
