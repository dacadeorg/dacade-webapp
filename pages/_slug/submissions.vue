<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-8">
        <div class="site-wraper">
          <div class="mb-6">
            <b-card
              v-for="(submission, key) in submissions"
              :key="submission.key"
              class="bg-dark mb-4 small-shadow"
              style="border-bottom: 2px solid rgb(83, 209, 175)"
            >
              <nuxt-link
                :to="{path: submissionPath($route.params.slug, key) }"
              >
                <span class="float-right muted-dark">
                  {{ convertDate(submission.date) }}
                </span>
                <b>
                  Submission
                </b>
                <span class="muted-dark">
                  by
                </span>
                <span class="dark-white">
                  <b>
                    {{ submission.displayName }}
                  </b>
                </span>
                <div v-if="submission.submissionPoints >= 0">
                  <b class="learning-color">
                    {{ submission.submissionPoints }}<span class="learning-color-muted">/{{ communityData.challengePoints }} LP</span>
                  </b>
                </div>
                <b-card-text class="mt-2">
                  {{ contentPreview(submission.text) }}..
                </b-card-text>
              </nuxt-link>
            </b-card>
          </div>
          <div class="text-center">
            <b-button v-if="showMoreButton" @click.prevent="getSubmissions()" class="btn-outline-primary btn-block">
              Show More
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'
import util from '~/assets/js/util'

export default {
  data() {
    return {
      submissions: null,
      lastKey: null,
      showMoreButton: true
    }
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData'
    })
  },
  created() {
    this.getFirstSubmissions()
  },
  methods: {
    contentPreview(content) {
      return util.contentPreview(content)
    },
    submissionPath(slug, submissionKey) {
      return `/${slug}/submission/${submissionKey}`
    },
    convertDate(date) {
      return util.convertDate(date)
    },
    async getSubmissions() {
      await firebase.database().ref(`submissions/${this.$route.params.slug}`).orderByKey().limitToLast(6).endAt(this.lastKey).once('value').then((snapShot) => {
        let newSubmissions = snapShot.val()
        const lastKey = Object.keys(newSubmissions)[0]
        Object.assign(newSubmissions, this.reverseSubmissions(this.submissions))
        if (this.lastKey !== lastKey) {
          this.lastKey = lastKey
          delete newSubmissions[lastKey]
        } else {
          this.showMoreButton = false
        }
        this.submissions = this.reverseSubmissions(newSubmissions)
      })
    },
    async getFirstSubmissions() {
      await firebase.database().ref(`submissions/${this.$route.params.slug}`).orderByKey().limitToLast(6).once('value').then((snapShot) => {
        let submissions = snapShot.val()
        const lastKey = Object.keys(submissions)[0]
        this.lastKey = lastKey
        delete submissions[lastKey]
        this.submissions = this.reverseSubmissions(submissions)
      })
    },
    reverseSubmissions(submissions) {
      const ordered = {}
      Object.keys(submissions).reverse().forEach(function (key) {
        ordered[key] = submissions[key]
      })
      return ordered
    }
  }
}
</script>
<style scoped>
.card-date {
  color: rgba(255,255,255,.5);
  float: right;
}

a{
  color:rgba(255,255,255,.5);
}

.btn-secondary {
  background: none;
}

a:hover{
  text-decoration: none;
}

.small-shadow:hover{
  border: 1.6px solid #53d1af;
}
</style>
