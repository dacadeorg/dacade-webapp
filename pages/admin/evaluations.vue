<template>
  <div>
    <div class="row">
      <div class="offset-md-3 col-lg-6">
        <div class="mb-4">
          <h1>
            <b>
              SUBMISSIONS
            </b>
          </h1>
        </div>
        <div class="mb-4">
          <b-button @click="back()">
            BACK
          </b-button>
        </div>
      </div>
      <div class="offset-md-3 col-lg-6">
        <div>
          <b-card
            v-for="( submission, key ) in submissions"
            :key="key"
            class="mb-4"
            bg-variant="dark"
            text-variant="white"
            :title="convertDate(submission.date)"
          >
            <b-card-text>
              <b>
                {{ submission.communityId }}
              </b>
            </b-card-text>
            <b-card-text class="mb-4">
              {{ submission.displayName }}:
              <span class="muted-dark">
                {{ contentPreview(submission.text) }}..
              </span>
            </b-card-text>
            <nuxt-link class="btn-dark mt-2" :to="{path: submissionPath($route.params.slug, key, submission.communityId) }">
              See Submission
            </nuxt-link>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars */
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import util from '~/assets/js/util'

export default {
  data() {
    return {
      submissions: null
    }
  },
  computed: {
    ...mapGetters({
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  mounted() {
    if ((!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0)) {
      this.getCommunityDataPreview()
    }
  },
  created() {
    this.getSubmissions()
  },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview'
    }),
    submissionPath(slug, submissionKey, communityId) {
      return `/admin/evaluation/${communityId}/${submissionKey}`
    },
    back() {
      this.$router.back()
    },
    convertDate(date) {
      return util.convertDate(date)
    },
    contentPreview(content) {
      return util.contentPreview(content)
    },
    async getSubmissions() {
      await firebase.database().ref(`openSubmissions`).once('value').then((snapShot) => {
        this.submissions = snapShot.val()
      })
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}
</style>
