<template>
  <div>
    <Navigation />
    Welcome to {{ chapterData.chapterName }}
    <!-- Hello {{ communityData }} -->
    {{$route.params}}
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
  asyncData({ params }) {
    return db.ref(`communityData/${params.slug}/chapter/${params.id}`).once('value').then((snapShot) => {
      const chapterData = snapShot.val()
      chapterData.key = params.id // snapShot.key
      return { chapterData }
    })
  },
  methods: {
    chapterPath(params) {
      console.log(params)
      const newParams = parseInt(params.id, 10) + 1
      return `/${params.slug}/chapter/${newParams}`
    }
  }
}
</script>
