<template>
  <div>
    <Navigation />
    <!-- Welcome to {{ chapterData.chapterName }} -->
    <!-- Hello {{ communityData }} -->
    <!-- {{ $route.params }} -->
    {{ chapterData }}
    <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{path: chapterPath($route.params) }">
      Next chapter
    </nuxt-link>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import Navigation from '@/components/Navigation'
const db = firebase.database()
export default {
  components: {
    Navigation
  },
  props: {
    chapterData: {
      type: Object,
      required: true
    }
  },
  methods: {
    chapterPath(params) {
      const newParams = parseInt(params.id, 10) + 1
      return `/${params.slug}/chapter/${newParams}`
    }
  }
}
</script>
